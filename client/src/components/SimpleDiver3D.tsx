import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { getAssetUrl, ASSET_PATHS } from '@/utils/assets';

interface SimpleDiver3DProps {
  className?: string;
  style?: React.CSSProperties;
}

// Simple 3D Diver Component - just the model without background effects
function DiverModel({ mousePosition, isVisible }: { mousePosition: { x: number; y: number }; isVisible: boolean }) {
  const { scene, animations } = useGLTF(getAssetUrl(ASSET_PATHS.MODELS.SWIMMING));
  const { actions } = useAnimations(animations, scene);
  const diverRef = useRef<THREE.Group>(null);
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });

  // Start swimming animation and set diver color
  useEffect(() => {
    if (actions['Armature|mixamo.com|Layer0']) {
      if (isVisible) {
        actions['Armature|mixamo.com|Layer0'].play();
      } else {
        actions['Armature|mixamo.com|Layer0'].stop();
      }
    }
    
    // Change diver color to dark blue
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshLambertMaterial({
          color: '#000080', // Dark blue color
          transparent: true,
          opacity: 0.9
        });
        child.castShadow = false; // Disable shadows for simplicity
        child.receiveShadow = false;
      }
    });
  }, [actions, scene, isVisible]);

  // Update target position based on mouse
  useEffect(() => {
    // Convert mouse position to 3D space (normalize to -1 to 1 range)
    // Keep within container bounds (roughly -2 to 2 in X, -1 to 1 in Y)
    const normalizedX = Math.max(-2, Math.min(2, (mousePosition.x - 0.5) * 4));
    const normalizedY = Math.max(-1, Math.min(1, (mousePosition.y - 0.5) * 2));
    
    targetPosition.current = {
      x: normalizedX,
      y: normalizedY,
      z: 0
    };
  }, [mousePosition]);

  // Smooth movement towards mouse position - only when visible
  useFrame((state) => {
    if (diverRef.current && isVisible) {
      const time = state.clock.getElapsedTime();
      
      // Smooth interpolation towards target position
      const lerpFactor = 0.02; // Adjust for speed (lower = slower)
      const currentPos = diverRef.current.position;
      
      currentPos.x += (targetPosition.current.x - currentPos.x) * lerpFactor;
      currentPos.y += (targetPosition.current.y - currentPos.y) * lerpFactor;
      currentPos.z += (targetPosition.current.z - currentPos.z) * lerpFactor;
      
      // Keep within container bounds
      currentPos.x = Math.max(-2, Math.min(2, currentPos.x));
      currentPos.y = Math.max(-1, Math.min(1, currentPos.y));
      
      // Gentle floating motion on top of mouse following
      const floatY = Math.sin(time * 0.5) * 0.1;
      const floatX = Math.sin(time * 0.3) * 0.05;
      
      currentPos.x += floatX;
      currentPos.y += floatY;
      
      // Rotate diver to face movement direction
      const deltaX = targetPosition.current.x - currentPos.x;
      const deltaY = targetPosition.current.y - currentPos.y;
      if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
        diverRef.current.rotation.y = Math.atan2(deltaX, deltaY);
      }
    }
  });

  return (
    <group ref={diverRef} scale={[1.8, 1.8, 1.8]} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// Simple 3D Diver Component
export function SimpleDiver3D({ className = "", style }: SimpleDiver3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track section visibility using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '50px' // Start animation slightly before section is fully visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Track mouse position within the container
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        
        setMousePosition({
          x: Math.max(0, Math.min(1, x)),
          y: Math.max(0, Math.min(1, y))
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${className}`} 
      style={style}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Enhanced lighting for visibility */}
        <ambientLight intensity={0.8} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
        <pointLight position={[0, 0, 5]} intensity={0.4} color="#ffffff" />

        {/* Diver Model */}
        <DiverModel mousePosition={mousePosition} isVisible={isVisible} />
      </Canvas>
    </div>
  );
}
