import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { getAssetUrl, ASSET_PATHS } from '@/utils/assets';

interface DiverBackgroundProps {
  scrollProgress: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

// 3D Diver Component
function DiverModel({ scrollProgress, mousePosition }: { scrollProgress: number; mousePosition: [number, number] }) {
  const { scene, animations } = useGLTF(getAssetUrl(ASSET_PATHS.MODELS.SWIMMING));
  const { actions } = useAnimations(animations, scene);
  const diverRef = useRef<THREE.Group>(null);
  const [diverPosition, setDiverPosition] = useState<[number, number, number]>([0, 0, 0]);

  // Start swimming animation and set diver color
  useEffect(() => {
    if (actions['Armature|mixamo.com|Layer0']) {
      actions['Armature|mixamo.com|Layer0'].play();
    }
    
    // Change diver color to a bright blue/cyan
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshLambertMaterial({
          color: '#00BFFF', // Bright blue/cyan color
          transparent: true,
          opacity: 0.5
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [actions, scene]);

  // Update diver position - diver moves along the full center line based on mouse
  useFrame((state) => {
    if (diverRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Get viewport dimensions for responsive scaling
      const viewport = state.viewport;
      const isMobile = viewport.width < 768;
      const isTablet = viewport.width >= 768 && viewport.width < 1024;
      
      // Responsive movement range
      const movementRange = isMobile ? 4 : isTablet ? 6 : 8;
      const swimIntensity = isMobile ? 0.2 : isTablet ? 0.25 : 0.3;
      
      // Position diver exactly on the center line (X = 0)
      const centerX = 0;
      
      // Mouse controls vertical position along the FULL line height
      // Map mouse Y (-1 to 1) to responsive timeline height
      const mouseY = -mousePosition[1] * movementRange;
      
      // Add some swimming motion along the line
      const swimY = Math.sin(time * 0.3) * swimIntensity; // Responsive swimming motion
      const swimZ = Math.sin(time * 0.2) * swimIntensity; // Forward/back swimming
      
      // Mouse X controls depth movement (responsive)
      const depthRange = isMobile ? 0.3 : isTablet ? 0.4 : 0.5;
      const mouseZ = mousePosition[0] * depthRange;
      
      // Combine movements - diver moves along full center line based on mouse
      const finalX = centerX; // Always on the center line
      const finalY = mouseY + swimY; // Mouse controls full vertical range
      const finalZ = swimZ + mouseZ; // Mouse controls depth
      
      diverRef.current.position.set(finalX, finalY, finalZ);
      
      // Make diver look in the direction of movement
      const lookAtX = 0; // Always look along the line
      const lookAtY = finalY + (mouseY * 0.05); // Look in movement direction
      const lookAtZ = finalZ + 1; // Look forward
      diverRef.current.lookAt(lookAtX, lookAtY, lookAtZ);
      
      // Rotation based on movement direction (responsive)
      const rotationIntensity = isMobile ? 0.1 : isTablet ? 0.15 : 0.2;
      diverRef.current.rotation.y = Math.sin(time * 0.2) * rotationIntensity + (mousePosition[0] * 0.1);
    }
  });

  // Responsive scale based on viewport
  const [scale, setScale] = useState([0.8, 0.8, 0.8]);
  
  useFrame((state) => {
    const viewport = state.viewport;
    const isMobile = viewport.width < 768;
    const isTablet = viewport.width >= 768 && viewport.width < 1024;
    
    const newScale = isMobile ? 0.5 : isTablet ? 0.6 : 0.8;
    if (scale[0] !== newScale) {
      setScale([newScale, newScale, newScale]);
    }
  });

  return (
    <group ref={diverRef} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

// Bubble particles
function BubbleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const [bubbles, setBubbles] = useState<THREE.Vector3[]>([]);

  useEffect(() => {
    const bubbleArray: THREE.Vector3[] = [];
    for (let i = 0; i < 50; i++) {
      bubbleArray.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        )
      );
    }
    setBubbles(bubbleArray);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const viewport = state.viewport;
      const isMobile = viewport.width < 768;
      
      // Responsive rotation speed
      const rotationSpeed = isMobile ? 0.0005 : 0.001;
      const xRotationSpeed = isMobile ? 0.00025 : 0.0005;
      
      pointsRef.current.rotation.y += rotationSpeed;
      pointsRef.current.rotation.x += xRotationSpeed;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={bubbles.length}
          array={new Float32Array(bubbles.flatMap(b => [b.x, b.y, b.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#4FC3F7"
        size={0.1}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

// Main Diver Background Component
export function DiverBackground({ scrollProgress, containerRef }: DiverBackgroundProps) {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        setMousePosition([Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y))]);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [containerRef]);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ background: 'transparent' }}
        className="w-full h-full"
      >
        {/* Underwater lighting - reduced intensity */}
        <ambientLight intensity={0.1} color="#1E3A8A" />
        <directionalLight position={[10, 10, 5]} intensity={0.2} color="#3B82F6" />
        <pointLight position={[-10, -10, -5]} intensity={0.1} color="#06B6D4" />

        {/* Diver Model */}
        <DiverModel scrollProgress={scrollProgress} mousePosition={mousePosition} />

        {/* Bubble Field */}
        <BubbleField />

        {/* Underwater fog - reduced intensity */}
        <fog attach="fog" args={['#1E3A8A', 15, 25]} />
      </Canvas>
    </div>
  );
}
