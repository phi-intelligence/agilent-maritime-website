import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getAssetUrl, ASSET_PATHS } from '@/utils/assets';

// Import textures - using the actual Earth textures from public assets

const CrystalGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const earthSphereRef = useRef<THREE.Mesh | null>(null);
  const glassSphereRef = useRef<THREE.Mesh | null>(null);
  // Commented out per request: remove water effect
  // const waterRef = useRef<THREE.Mesh | null>(null);
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

    // Scene with beautiful light blue background like the reference image
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x4a90e2); // Beautiful light blue
    scene.fog = new THREE.Fog(0x2d5aa0, 10, 40);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 8, 15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup with enhanced settings
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
    // Modern lighting is enabled by default in newer Three.js versions
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(10, 20, 10);
    mainLight.castShadow = true;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -20;
    mainLight.shadow.camera.right = 20;
    mainLight.shadow.camera.top = 20;
    mainLight.shadow.camera.bottom = -20;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x4fc3f7, 0.3);
    rimLight.position.set(-10, 5, -10);
    scene.add(rimLight);

    // Texture loader
    const textureLoader = new THREE.TextureLoader();

    // Create sphere geometry
    const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);

    // Load Earth textures from public assets
    const earthMap = textureLoader.load(getAssetUrl(ASSET_PATHS.TEXTURES.EARTH));
    const bumpMap = textureLoader.load(getAssetUrl(ASSET_PATHS.TEXTURES.EARTH_B));
    const cloudMap = textureLoader.load(getAssetUrl(ASSET_PATHS.TEXTURES.LIGHT));

    // Inner Earth sphere with realistic material
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthMap,
      bumpMap: bumpMap,
      bumpScale: 0.05,
      specular: new THREE.Color(0x333333),
      shininess: 5
    });

    const earthSphere = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthSphere.scale.set(0.95, 0.95, 0.95);
    earthSphere.castShadow = true;
    scene.add(earthSphere);
    earthSphereRef.current = earthSphere;

    // Outer glass sphere with crystal-like properties
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0,
      transmission: 0.95,
      transparent: true,
      opacity: 0.3,
      reflectivity: 0.9,
      ior: 1.5,
      thickness: 0.5,
      specularIntensity: 1,
      specularColor: new THREE.Color(0xffffff),
      envMapIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0
    });

    const glassSphere = new THREE.Mesh(sphereGeometry, glassMaterial);
    glassSphere.castShadow = true;
    glassSphere.receiveShadow = true;
    scene.add(glassSphere);
    glassSphereRef.current = glassSphere;

    // Water effect removed

    // Add orbit controls with smooth interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 8;
    controls.maxDistance = 25;
    controls.maxPolarAngle = Math.PI * 0.75;
    controlsRef.current = controls;

    // Animation variables
    let sphereY = 0;
    let floatDirection = 1;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (!isVisibleRef.current) return;
      
      const elapsed = clockRef.current.getElapsedTime();
      
      // Rotate Earth
      if (earthSphereRef.current) {
        earthSphereRef.current.rotation.y += 0.002;
        
        // Float animation
        sphereY += 0.003 * floatDirection;
        if (sphereY > 0.5 || sphereY < -0.5) {
          floatDirection *= -1;
        }
        earthSphereRef.current.position.y = sphereY;
      }
      
      // Animate glass sphere
      if (glassSphereRef.current) {
        glassSphereRef.current.position.y = sphereY;
        glassSphereRef.current.rotation.y += 0.001;
        glassSphereRef.current.rotation.x = Math.sin(elapsed * 0.5) * 0.02;
      }
      
      // Water effect removed
      
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
        background: 'linear-gradient(180deg, #4a90e2 0%, #2d5aa0 100%)',
        boxShadow: '0 8px 32px rgba(74, 144, 226, 0.6)',
        minHeight: '600px'
      }}
    />
  );
};

export default CrystalGlobe;