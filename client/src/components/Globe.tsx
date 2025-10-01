import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Import textures
import { getAssetUrl, ASSET_PATHS } from '@/utils/assets';

const Globe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
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

    // Scene with dark space background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 10, 50);
    sceneRef.current = scene;

    // Standard lighting
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
    camera.position.set(0, 0, 8);
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

    // Create the Globe
    const globeGroup = new THREE.Group();
    globeGroup.position.y = 0;
    
    // Earth geometry and materials
    const earthGeometry = new THREE.SphereGeometry(3, 64, 64);
    
    // Load earth textures
    const earthMap = textureLoader.load(getAssetUrl(ASSET_PATHS.TEXTURES.EARTH));
    const bumpMap = textureLoader.load(getAssetUrl(ASSET_PATHS.TEXTURES.EARTH_B));
    const cloudMap = textureLoader.load(getAssetUrl(ASSET_PATHS.TEXTURES.LIGHT));
    
    // Earth material with realistic colors
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
      new THREE.SphereGeometry(3.02, 64, 64),
      new THREE.MeshPhongMaterial({
        map: cloudMap,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        side: THREE.DoubleSide,
        color: 0xffffff
      })
    );

    globeGroup.add(earth);
    globeGroup.add(clouds);
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 5;
    controls.maxDistance = 15;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (!isVisibleRef.current) return;
      
      const elapsed = clockRef.current.getElapsedTime();
      
      // Update earth shader uniforms
      if (globeGroupRef.current) {
        const earth = globeGroupRef.current.children[0];
        if (earth && (earth as THREE.Mesh).material) {
          ((earth as THREE.Mesh).material as THREE.ShaderMaterial).uniforms.time.value = elapsed;
        }
        
        // Rotate the globe
        globeGroupRef.current.rotation.y += 0.003;
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
        background: 'linear-gradient(to bottom, #000000 0%, #111111 50%, #222222 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
        minHeight: '600px'
      }}
    />
  );
};

export default Globe;
