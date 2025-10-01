import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { getAssetUrl, ASSET_PATHS } from '@/utils/assets';

interface CraneHarbour3DProps {
  className?: string;
  style?: React.CSSProperties;
}

// 3D Crane Harbour Component
function CraneModel({ isVisible, screenSize }: { isVisible: boolean; screenSize: { width: number; height: number } }) {
  const { scene, animations } = useGLTF(getAssetUrl(ASSET_PATHS.MODELS.CRANE_HARBOUR));
  const { actions } = useAnimations(animations, scene);
  const craneRef = useRef<THREE.Group>(null);

  // Start crane animation and set crane appearance
  useEffect(() => {
    // Play all available animations
    if (actions) {
      Object.values(actions).forEach((action) => {
        if (action) {
          if (isVisible) {
            action.play();
          } else {
            action.stop();
          }
        }
      });
    }
    
    // Set crane material properties with yellow and black colors
    let partIndex = 0;
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Alternate between yellow and black for different parts (deterministic)
        const isYellow = partIndex % 2 === 0;
        child.material = new THREE.MeshLambertMaterial({
          color: isYellow ? '#FFD700' : '#000000', // Yellow and black alternating
          transparent: true,
          opacity: 0.9
        });
        child.castShadow = false;
        child.receiveShadow = false;
        partIndex++;
      }
    });
  }, [actions, scene, isVisible]);

  // Crane positioning - no rotation
  useFrame((state) => {
    if (craneRef.current && isVisible) {
      // Keep crane stationary - no rotation or movement
      // Crane stays in fixed position
    }
  });

  return (
    <group 
      ref={craneRef} 
      scale={screenSize.width < 768 ? [2.0, 2.0, 2.0] : screenSize.width < 1024 ? [2.5, 2.5, 2.5] : [3.0, 3.0, 3.0]} 
      position={screenSize.width < 768 ? [0, -1, 0] : [0, -1.5, 0]}
    >
      <primitive object={scene} />
    </group>
  );
}

// 3D Crane Harbour Component
export function CraneHarbour3D({ className = "", style }: CraneHarbour3DProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track screen size for responsive behavior
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Track container size changes for layout adaptation
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Animation will adapt to container size changes
        // This helps when cards expand and change the layout
      }
    });

    resizeObserver.observe(containerRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);

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

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${className}`} 
      style={style}
    >
      <Canvas
        camera={{ 
          position: screenSize.width < 768 
            ? [-15, 18, 20]  // Mobile: top left side view - adjusted for larger scale
            : screenSize.width < 1024 
            ? [-18, 22, 25]  // Tablet: top left side view - adjusted for larger scale
            : [-18, 18, 60], // Desktop: top left side view - adjusted for larger scale
          fov: screenSize.width < 768 ? 75 : 65 
        }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: screenSize.width >= 768, // Disable on mobile for performance
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Responsive lighting for crane visibility */}
        <ambientLight intensity={screenSize.width < 768 ? 0.9 : 0.8} color="#ffffff" />
        <directionalLight 
          position={screenSize.width < 768 ? [8, 8, 4] : [10, 10, 5]} 
          intensity={screenSize.width < 768 ? 0.9 : 0.8} 
          color="#ffffff" 
        />
        <pointLight position={[0, 5, 5]} intensity={screenSize.width < 768 ? 0.6 : 0.5} color="#ffffff" />
        {screenSize.width >= 768 && (
          <pointLight position={[-5, 5, 5]} intensity={0.3} color="#87CEEB" />
        )}

        {/* Crane Model */}
        <CraneModel isVisible={isVisible} screenSize={screenSize} />
      </Canvas>
    </div>
  );
}
