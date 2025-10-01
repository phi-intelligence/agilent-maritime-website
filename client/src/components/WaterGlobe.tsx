import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Import textures
import { getAssetUrl, ASSET_PATHS } from '@/utils/assets';

const WaterGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const waterRef = useRef<THREE.Mesh | null>(null);
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

    // Scene with dark space-like background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 10, 50);
    sceneRef.current = scene;

    // Standard lighting for space view
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Main directional light (sun)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(10, 10, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Secondary light for better illumination
    const secondaryLight = new THREE.DirectionalLight(0xffffff, 0.6);
    secondaryLight.position.set(-5, -10, -5);
    scene.add(secondaryLight);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 2, 12);
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
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Texture loader
    const textureLoader = new THREE.TextureLoader();

    // Create the Globe (centered in space)
    const globeGroup = new THREE.Group();
    globeGroup.position.y = 0; // Centered
    
    // Earth geometry and materials
    const earthGeometry = new THREE.SphereGeometry(2.5, 64, 64);
    
    // Load earth textures
    const earthMap = textureLoader.load(getAssetUrl(ASSET_PATHS.TEXTURES.EARTH));
    const bumpMap = textureLoader.load(getAssetUrl(ASSET_PATHS.TEXTURES.EARTH_B));
    const cloudMap = textureLoader.load(getAssetUrl(ASSET_PATHS.TEXTURES.LIGHT));
    
    // Standard Earth material with realistic colors
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
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
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
        
        void main() {
          // Get texture with realistic Earth colors
          vec4 texel = texture2D(earthTexture, vUv);
          float gray = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
          
          // Realistic Earth color scheme
          vec3 landColor = mix(vec3(0.2, 0.4, 0.1), vec3(0.6, 0.5, 0.3), gray);
          vec3 oceanColor = vec3(0.1, 0.3, 0.8);
          
          // Mix land and ocean based on texture
          vec3 baseColor = mix(oceanColor, landColor, gray);
          
          // Add subtle pulsing effect
          float pulse = sin(time * 0.5) * 0.05 + 1.0;
          baseColor *= pulse;
          
          gl_FragColor = vec4(baseColor, 1.0);
        }
      `,
      side: THREE.DoubleSide
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.castShadow = true;
    earth.receiveShadow = true;
    
    // Cloud layer
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(2.52, 64, 64),
      new THREE.MeshPhongMaterial({
        map: cloudMap,
        transparent: true,
        opacity: 0.15,
        depthWrite: false,
        side: THREE.DoubleSide,
        color: 0xffffff
      })
    );

    globeGroup.add(earth);
    globeGroup.add(clouds);
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Create Water Surface with advanced shader
    const waterGeometry = new THREE.PlaneGeometry(20, 20, 128, 128);
    const waterMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(width, height) },
        waterColor: { value: new THREE.Color(0x006994) },
        foamColor: { value: new THREE.Color(0x87ceeb) }
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        // Noise function for waves
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
          
          // Create wave displacement
          vec3 pos = position;
          float wave1 = snoise(vec3(pos.x * 0.1, pos.z * 0.1, time * 0.5)) * 0.3;
          float wave2 = snoise(vec3(pos.x * 0.2, pos.z * 0.2, time * 0.8)) * 0.15;
          float wave3 = snoise(vec3(pos.x * 0.4, pos.z * 0.4, time * 1.2)) * 0.08;
          
          pos.y += wave1 + wave2 + wave3;
          
          vPosition = pos;
          
          // Calculate normal for lighting
          float offset = 0.1;
          vec3 tangent = vec3(
            offset,
            snoise(vec3((pos.x + offset) * 0.1, pos.z * 0.1, time * 0.5)) * 0.3 - wave1,
            0.0
          );
          vec3 bitangent = vec3(
            0.0,
            snoise(vec3(pos.x * 0.1, (pos.z + offset) * 0.1, time * 0.5)) * 0.3 - wave1,
            offset
          );
          vNormal = normalize(cross(tangent, bitangent));
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        uniform vec3 waterColor;
        uniform vec3 foamColor;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Base water color
          vec3 color = waterColor;
          
          // Add foam based on wave height
          float foam = smoothstep(0.0, 0.3, vPosition.y);
          color = mix(color, foamColor, foam * 0.5);
          
          // Add caustic-like effects
          float caustic = sin(vUv.x * 20.0 + time * 2.0) * sin(vUv.y * 20.0 + time * 1.5);
          caustic = smoothstep(0.5, 1.0, caustic);
          color += caustic * 0.1;
          
          // Fresnel effect for realistic water
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = 1.0 - max(0.0, dot(viewDirection, vNormal));
          fresnel = pow(fresnel, 2.0);
          
          // Mix with reflection color
          vec3 reflectionColor = vec3(0.4, 0.7, 1.0);
          color = mix(color, reflectionColor, fresnel * 0.6);
          
          // Add transparency
          float alpha = 0.8 + fresnel * 0.2;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0;
    water.receiveShadow = true;
    scene.add(water);
    waterRef.current = water;

    // Add underwater particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * -10 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = Math.random() * 0.01 + 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x87ceeb,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.maxPolarAngle = Math.PI * 0.8; // Prevent going too far below
    controls.minDistance = 5;
    controls.maxDistance = 25;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (!isVisibleRef.current) return;
      
      const elapsed = clockRef.current.getElapsedTime();
      
      // Update water shader uniforms
      if (waterRef.current) {
        (waterRef.current.material as THREE.ShaderMaterial).uniforms.time.value = elapsed;
      }
      
      // Update earth shader uniforms
      if (globeGroupRef.current) {
        const earth = globeGroupRef.current.children[0];
        if (earth && (earth as THREE.Mesh).material) {
          ((earth as THREE.Mesh).material as THREE.ShaderMaterial).uniforms.time.value = elapsed;
        }
        
        // Rotate the globe
        globeGroupRef.current.rotation.y += 0.003;
        
        // Subtle bobbing motion
        globeGroupRef.current.position.y = -1.5 + Math.sin(elapsed * 0.5) * 0.1;
      }
      
      // Update particles
      const positions = particles.geometry.attributes.position.array as Float32Array;
      const velocities = particles.geometry.attributes.velocity.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        
        // Reset particles that float too high
        if (positions[i * 3 + 1] > 2) {
          positions[i * 3 + 1] = -10;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      
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
      
      // Update water shader resolution
      if (waterRef.current) {
        (waterRef.current.material as THREE.ShaderMaterial).uniforms.resolution.value.set(width, height);
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
        background: 'linear-gradient(to bottom, #001122 0%, #003366 50%, #004488 100%)',
        boxShadow: '0 8px 32px rgba(0, 34, 68, 0.5)',
        minHeight: '600px'
      }}
    />
  );
};

export default WaterGlobe;
