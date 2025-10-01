import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { getAssetUrl, ASSET_PATHS } from '@/utils/assets';

interface SwimmingDiverProps {
  scrollProgress: number; // 0 to 1, where 0 is top of vessels section, 1 is bottom
  isVisible: boolean;
}

interface BubblesEffectProps {
  swimmingDepth: number;
}

function BubblesEffect({ swimmingDepth }: BubblesEffectProps) {
  const bubblesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (bubblesRef.current) {
      // Animate bubbles
      bubblesRef.current.children.forEach((bubble, i) => {
        const time = state.clock.elapsedTime;
        const bubbleY = swimmingDepth + (i * 2) + Math.sin(time + i) * 0.5;
        const bubbleX = Math.sin(time * 0.5 + i) * 3;
        const bubbleScale = 0.1 + Math.sin(time * 2 + i) * 0.05;
        
        bubble.position.set(bubbleX, bubbleY, Math.cos(time + i) * 2);
        bubble.scale.setScalar(bubbleScale);
      });
    }
  });

  return (
    <group ref={bubblesRef}>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial 
            color="#87ceeb" 
            transparent 
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export function SwimmingDiver({ scrollProgress, isVisible }: SwimmingDiverProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const [model, setModel] = useState<any>(null);

  // Load the swimming model
  const { scene, animations } = useGLTF(getAssetUrl(ASSET_PATHS.MODELS.SWIMMING));

  useEffect(() => {
    if (scene && animations.length > 0) {
      // Clone the scene to avoid conflicts
      const clonedScene = scene.clone();
      setModel(clonedScene);
      
      // Set up animation mixer
      const mixer = new THREE.AnimationMixer(clonedScene);
      mixerRef.current = mixer;
      
      // Play the swimming animation
      const action = mixer.clipAction(animations[0]);
      action.play();
    }
  }, [scene, animations]);

  // Animation loop
  useFrame((state, delta) => {
    if (mixerRef.current && isVisible) {
      mixerRef.current.update(delta);
    }
  });

  // Calculate swimming position based on scroll progress
  const swimmingDepth = -scrollProgress * 20; // Swim down 20 units
  const swimmingRotation = scrollProgress * Math.PI * 0.5; // Rotate as swimming down
  const swimmingScale = 0.8 + scrollProgress * 0.4; // Scale up as going deeper

  // Parallax effect - swim at different speeds
  const parallaxOffset = scrollProgress * 5;

  if (!model || !isVisible) return null;

  return (
    <group ref={groupRef}>
      {/* Water environment */}
      <mesh position={[0, 0, -5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial 
          color="#1e40af" 
          transparent 
          opacity={0.1}
        />
      </mesh>
      
      {/* Swimming diver */}
      <primitive
        object={model}
        position={[parallaxOffset, swimmingDepth, 0]}
        rotation={[0, swimmingRotation, 0]}
        scale={[swimmingScale, swimmingScale, swimmingScale]}
      />
      
      {/* Bubbles effect */}
      <BubblesEffect swimmingDepth={swimmingDepth} />
    </group>
  );
}

// Preload the model
useGLTF.preload(getAssetUrl(ASSET_PATHS.MODELS.SWIMMING));
