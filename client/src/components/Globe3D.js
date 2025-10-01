import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Import textures and symbol
import { getAssetUrl, ASSET_PATHS } from '@/utils/assets';
// Note: phiSymbol import removed as file doesn't exist yet

const Globe3D = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const sphereRef = useRef(null);
  const controlsRef = useRef(null);
  const animationIdRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const isVisibleRef = useRef(true);
  const phiSymbolRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Basic setup
    const container = containerRef.current;
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || 400;

    // Scene with dark background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 1, 25);
    sceneRef.current = scene;
    
    // Add ambient light (white light)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add white directional light for main illumination
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 3, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add second light for better illumination
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, -3, -5);
    scene.add(directionalLight2);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 8;
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup (remove post-processing)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0; // Reduced from 1.2
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create Earth sphere with grayscale textures - increasing the size from 2 to 3
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    
    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    
    // Load and convert textures to grayscale
    const loadGrayscaleTexture = (url) => {
      const texture = textureLoader.load(url);
      texture.colorSpace = THREE.LinearSRGBColorSpace;
      return texture;
    };
    
    const earthMap = loadGrayscaleTexture(getAssetUrl(ASSET_PATHS.TEXTURES.EARTH));
    const bumpMap = loadGrayscaleTexture(getAssetUrl(ASSET_PATHS.TEXTURES.EARTH_B));
    const cloudMap = textureLoader.load(getAssetUrl(ASSET_PATHS.TEXTURES.LIGHT));
    
    // Main Earth material with clean, flat appearance
    const material = new THREE.ShaderMaterial({
      uniforms: {
        earthTexture: { value: earthMap },
        bumpMap: { value: bumpMap },
        bumpScale: { value: 0.1 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D earthTexture;
        uniform sampler2D bumpMap;
        uniform float bumpScale;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          // Get texture and convert to grayscale
          vec4 texel = texture2D(earthTexture, vUv);
          float gray = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
          
          // Simple dark appearance without rim lighting
          vec3 baseColor = vec3(gray * 0.3);
          
          gl_FragColor = vec4(baseColor, 1.0);
        }
      `,
      side: THREE.DoubleSide
    });
    materialRef.current = material;
    
    // Create the Phi symbol sprite
    const createPhiSymbol = () => {
      const spriteMap = textureLoader.load(phiSymbol);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: spriteMap,
        transparent: true,
        opacity: 0.9,
        color: 0x000000, // Changed to black
        depthTest: false
      });
      
      const sprite = new THREE.Sprite(spriteMaterial);
      // Further reduce the symbol size
      const scale = 1.2; // Reduced from 2.0 to 1.2
      sprite.scale.set(scale, scale, 1);
      sprite.position.set(0, 0, 0);
      
      // Make sure the sprite always faces the camera
      sprite.material.rotation = 0; // Removed rotation
      
      return sprite;
    };
    
    // Create the Earth group
    const sphere = new THREE.Group();
    const earth = new THREE.Mesh(geometry, material);
    const clouds = new THREE.Mesh(new THREE.SphereGeometry(3.01, 64, 64), new THREE.MeshPhongMaterial({
      map: cloudMap,
      transparent: true,
      opacity: 0.2,  // Reduced opacity for more subtle clouds
      depthWrite: false,
      side: THREE.DoubleSide,
      color: 0xffffff  // White clouds
    }));
    
    const phiSymbolSprite = createPhiSymbol();
    
    // Add all elements to the group (excluding atmosphere)
    sphere.add(earth);
    sphere.add(clouds);
    sphere.add(phiSymbolSprite);
    phiSymbolRef.current = phiSymbolSprite;
    
    scene.add(sphere);
    sphereRef.current = sphere;
    
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;  // Slower rotation
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (!isVisibleRef.current || !sphereRef.current) return;
      
      const delta = clockRef.current.getDelta();
      const elapsed = clockRef.current.getElapsedTime();
      
      // Rotate the sphere
      sphere.rotation.y += 0.002;
      
      // Make clouds rotate slightly faster than the earth
      clouds.rotation.y += 0.0005;
      
      // Pulsing effect for the Phi symbol
      if (phiSymbolRef.current) {
        phiSymbolRef.current.quaternion.copy(camera.quaternion); // Keep it facing the camera
      }
      
      // Update controls
      controls.update();
      
      // Render the scene directly without post-processing
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
        if (rendererRef.current.domElement) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      
      // Clean up geometries and materials
      [geometry, new THREE.SphereGeometry(3.01, 64, 64)].forEach(geo => {
        if (geo) geo.dispose();
      });
      
      [materialRef.current, new THREE.MeshPhongMaterial({
        map: cloudMap,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        side: THREE.DoubleSide,
        color: 0xffffff
      })].forEach(mat => {
        if (mat) {
          if (mat.map) mat.map.dispose();
          if (mat.dispose) mat.dispose();
        }
      });
      
      // Clear refs
      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
      sphereRef.current = null;
      controlsRef.current = null;
      phiSymbolRef.current = null;
      materialRef.current = null;
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #000000 0%, #1a1a1a 100%)',
        borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
      }}
    />
  );
};

export default Globe3D;