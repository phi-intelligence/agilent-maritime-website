import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Import textures
import { getAssetUrl, ASSET_PATHS } from '@/utils/assets';

const VortexGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const vortexRef = useRef<THREE.Mesh | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const clockRef = useRef(new THREE.Clock());
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Basic setup
    const container = containerRef.current;
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || 600;

    // Scene with deep blue background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x001144);
    scene.fog = new THREE.Fog(0x001144, 5, 50);
    sceneRef.current = scene;

    // Enhanced lighting for dramatic effect
    const ambientLight = new THREE.AmbientLight(0x4a90e2, 0.4);
    scene.add(ambientLight);

    // Main directional light (sun through water)
    const sunLight = new THREE.DirectionalLight(0x87ceeb, 2.0);
    sunLight.position.set(10, 10, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Secondary light for better illumination
    const secondaryLight = new THREE.DirectionalLight(0x4a90e2, 1.0);
    secondaryLight.position.set(-5, -10, -5);
    scene.add(secondaryLight);

    // Rim light for dramatic effect
    const rimLight = new THREE.DirectionalLight(0x87ceeb, 0.8);
    rimLight.position.set(0, 0, -10);
    scene.add(rimLight);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Texture loader
    const textureLoader = new THREE.TextureLoader();

    // Create the Globe (centered)
    const globeGroup = new THREE.Group();
    globeGroup.position.y = 0;
    
    // Earth geometry and materials
    const earthGeometry = new THREE.SphereGeometry(2.5, 64, 64);
    
    // Load earth textures
    const earthMap = textureLoader.load(getAssetUrl(ASSET_PATHS.TEXTURES.EARTH));
    const bumpMap = textureLoader.load(getAssetUrl(ASSET_PATHS.TEXTURES.EARTH_B));
    const cloudMap = textureLoader.load(getAssetUrl(ASSET_PATHS.TEXTURES.LIGHT));
    
    // Enhanced Earth material
    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: {
        earthTexture: { value: earthMap },
        bumpMap: { value: bumpMap },
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D earthTexture;
        uniform sampler2D bumpMap;
        uniform float time;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        
        void main() {
          // Get texture with enhanced maritime colors
          vec4 texel = texture2D(earthTexture, vUv);
          float gray = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
          
          // Enhanced maritime color scheme
          vec3 landColor = mix(vec3(0.3, 0.5, 0.2), vec3(0.7, 0.6, 0.4), gray);
          vec3 oceanColor = vec3(0.1, 0.4, 0.9);
          
          // Mix land and ocean based on texture
          vec3 baseColor = mix(oceanColor, landColor, gray);
          
          // Add fresnel rim lighting
          vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
          float fresnel = 1.0 - max(0.0, dot(viewDirection, vNormal));
          fresnel = pow(fresnel, 2.0);
          
          // Enhanced with rim glow
          vec3 rimColor = vec3(0.4, 0.8, 1.0);
          baseColor = mix(baseColor, rimColor, fresnel * 0.3);
          
          // Add subtle pulsing effect
          float pulse = sin(time * 0.5) * 0.1 + 1.0;
          baseColor *= pulse;
          
          gl_FragColor = vec4(baseColor, 1.0);
        }
      `,
      side: THREE.DoubleSide
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.castShadow = true;
    earth.receiveShadow = true;
    
    // Enhanced cloud layer
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(2.52, 64, 64),
      new THREE.MeshPhongMaterial({
        map: cloudMap,
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
        side: THREE.DoubleSide,
        color: 0xffffff
      })
    );

    globeGroup.add(earth);
    globeGroup.add(clouds);
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Create Water Vortex Effect
    const vortexGeometry = new THREE.CylinderGeometry(20, 8, 30, 64, 64, true);
    const vortexMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(width, height) }
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying float vDistortion;
        
        // Noise function for vortex distortion
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
                                        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                                        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
        
        void main() {
          vUv = uv;
          
          vec3 pos = position;
          
          // Create vortex spiral effect
          float radius = length(vec2(pos.x, pos.z));
          float angle = atan(pos.z, pos.x);
          
          // Spiral distortion based on height and time
          float spiralStrength = (15.0 - abs(pos.y)) / 15.0; // Stronger near center
          float spiral = angle + time * 2.0 + radius * 0.5;
          
          // Add noise for organic water movement
          float noise1 = snoise(vec3(pos.x * 0.1, pos.y * 0.05, pos.z * 0.1 + time * 0.5));
          float noise2 = snoise(vec3(pos.x * 0.2, pos.y * 0.1, pos.z * 0.2 + time * 0.8));
          
          // Apply spiral and wave distortions
          pos.x += sin(spiral) * spiralStrength * 0.8 + noise1 * 0.3;
          pos.z += cos(spiral) * spiralStrength * 0.8 + noise2 * 0.3;
          
          // Vertical wave motion
          pos.y += sin(radius * 2.0 + time * 3.0) * 0.2 * spiralStrength;
          
          vPosition = pos;
          vDistortion = spiralStrength;
          
          // Calculate normal for lighting
          vec3 tangent = vec3(1.0, 0.0, 0.0);
          vec3 bitangent = vec3(0.0, 0.0, 1.0);
          vNormal = normalize(cross(tangent, bitangent));
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying float vDistortion;
        
        void main() {
          // Create dynamic water colors
          vec3 deepWater = vec3(0.0, 0.2, 0.6);
          vec3 shallowWater = vec3(0.2, 0.6, 1.0);
          vec3 foam = vec3(0.8, 0.9, 1.0);
          
          // Distance from center for color mixing
          float centerDist = length(vec2(vPosition.x, vPosition.z)) / 20.0;
          centerDist = clamp(centerDist, 0.0, 1.0);
          
          // Base color mixing
          vec3 baseColor = mix(deepWater, shallowWater, centerDist);
          
          // Add foam based on distortion and movement
          float foamFactor = vDistortion * (sin(time * 4.0 + vPosition.y * 0.5) * 0.5 + 0.5);
          foamFactor = smoothstep(0.3, 0.8, foamFactor);
          baseColor = mix(baseColor, foam, foamFactor * 0.6);
          
          // Add caustic-like effects
          float caustic1 = sin(vUv.x * 15.0 + time * 3.0) * sin(vUv.y * 15.0 + time * 2.5);
          float caustic2 = sin(vUv.x * 25.0 - time * 4.0) * sin(vUv.y * 25.0 - time * 3.5);
          float caustics = (caustic1 + caustic2) * 0.1;
          baseColor += caustics;
          
          // Fresnel effect for water realism
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = 1.0 - max(0.0, dot(viewDirection, vNormal));
          fresnel = pow(fresnel, 1.5);
          
          // Add reflection highlights
          vec3 reflectionColor = vec3(0.6, 0.8, 1.0);
          baseColor = mix(baseColor, reflectionColor, fresnel * 0.4);
          
          // Dynamic transparency based on distance and distortion
          float alpha = 0.6 + vDistortion * 0.3 + fresnel * 0.2;
          alpha = clamp(alpha, 0.3, 0.9);
          
          gl_FragColor = vec4(baseColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    const vortex = new THREE.Mesh(vortexGeometry, vortexMaterial);
    vortex.position.y = 0;
    scene.add(vortex);
    vortexRef.current = vortex;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.minDistance = 8;
    controls.maxDistance = 25;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (!isVisibleRef.current) return;
      
      const elapsed = clockRef.current.getElapsedTime();
      
      // Update vortex shader uniforms
      if (vortexRef.current) {
        (vortexRef.current.material as THREE.ShaderMaterial).uniforms.time.value = elapsed;
      }
      
      // Update earth shader uniforms
      if (globeGroupRef.current) {
        const earth = globeGroupRef.current.children[0];
        if (earth && (earth as THREE.Mesh).material) {
          ((earth as THREE.Mesh).material as THREE.ShaderMaterial).uniforms.time.value = elapsed;
        }
        
        // Rotate the globe
        globeGroupRef.current.rotation.y += 0.002;
        
        // Subtle floating motion
        globeGroupRef.current.position.y = Math.sin(elapsed * 0.5) * 0.2;
      }
      
      // Update controls
      controls.update();
      
      // Render
      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      
      // Update vortex shader resolution
      if (vortexRef.current) {
        (vortexRef.current.material as THREE.ShaderMaterial).uniforms.resolution.value.set(width, height);
      }
    };
    
    // Set up intersection observer for performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisibleRef.current = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    
    observer.observe(container);
    window.addEventListener('resize', handleResize);
    
    // Start animation loop
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement && container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      
      // Clean up geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative overflow-hidden rounded-lg"
      style={{ 
        background: 'radial-gradient(circle, #001144 0%, #000822 50%, #000000 100%)',
        boxShadow: '0 8px 32px rgba(0, 17, 68, 0.8)',
        minHeight: '600px'
      }}
    />
  );
};

export default VortexGlobe;
