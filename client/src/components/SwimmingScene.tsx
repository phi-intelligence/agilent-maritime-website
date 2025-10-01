import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { SwimmingDiver } from './SwimmingDiver';

interface SwimmingSceneProps {
  scrollProgress: number;
  isVisible: boolean;
  className?: string;
}

export function SwimmingScene({ scrollProgress, isVisible, className }: SwimmingSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className={`fixed inset-0 pointer-events-none z-10 ${className || ''}`}>
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />

        {/* Swimming Diver */}
        <SwimmingDiver scrollProgress={scrollProgress} isVisible={isVisible} />

        {/* Camera controls - disabled for fixed view */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
    </div>
  );
}
