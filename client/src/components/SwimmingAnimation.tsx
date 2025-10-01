import React from 'react';

interface SwimmingAnimationProps {
  scrollProgress: number; // 0 to 1, where 0 is top of vessels section, 1 is bottom
  isVisible: boolean;
  className?: string;
}

export function SwimmingAnimation({ scrollProgress, isVisible, className }: SwimmingAnimationProps) {
  // Add CSS animation for floating fish
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        25% { transform: translateY(-10px) translateX(5px); }
        50% { transform: translateY(-5px) translateX(-5px); }
        75% { transform: translateY(-15px) translateX(3px); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  // Calculate swimming position based on scroll progress
  const swimmingDepth = scrollProgress * 100; // Swim down 100vh
  const swimmingRotation = scrollProgress * 180; // Rotate as swimming down
  const swimmingScale = 0.8 + scrollProgress * 0.4; // Scale up as going deeper
  const opacity = isVisible ? 0.8 : 0;

  // Create bubbles
  const bubbles = Array.from({ length: 15 }, (_, i) => {
    const bubbleDelay = i * 0.2;
    const bubbleX = Math.sin(i * 0.5) * 20 + 50; // Spread bubbles horizontally
    const bubbleSize = 4 + Math.sin(i) * 2; // Vary bubble sizes
    
    return (
      <div
        key={i}
        className="absolute rounded-full bg-blue-200/60 animate-pulse"
        style={{
          left: `${bubbleX}%`,
          bottom: `${swimmingDepth + i * 5}vh`,
          width: `${bubbleSize}px`,
          height: `${bubbleSize}px`,
          animationDelay: `${bubbleDelay}s`,
          animationDuration: `${2 + Math.random()}s`,
          transform: `translateY(${Math.sin(i) * 10}px)`,
        }}
      />
    );
  });

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-500 ${className || ''}`}
      style={{ opacity }}
    >
      {/* Water background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-blue-800/10 to-blue-900/20" />
      
      {/* Swimming diver SVG */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{
          bottom: `${swimmingDepth}vh`,
          transform: `translateX(-50%) rotate(${swimmingRotation}deg) scale(${swimmingScale})`,
          transition: 'all 0.1s ease-out',
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          className="text-blue-400"
        >
          {/* Diver body */}
          <ellipse cx="50" cy="60" rx="15" ry="25" fill="currentColor" opacity="0.8" />
          
          {/* Diver head */}
          <circle cx="50" cy="35" r="12" fill="currentColor" opacity="0.8" />
          
          {/* Arms (swimming motion) */}
          <ellipse 
            cx="35" 
            cy="55" 
            rx="8" 
            ry="20" 
            fill="currentColor" 
            opacity="0.8"
            transform={`rotate(${Math.sin(scrollProgress * Math.PI * 4) * 15}, 35, 55)`}
          />
          <ellipse 
            cx="65" 
            cy="55" 
            rx="8" 
            ry="20" 
            fill="currentColor" 
            opacity="0.8"
            transform={`rotate(${Math.sin(scrollProgress * Math.PI * 4 + Math.PI) * 15}, 65, 55)`}
          />
          
          {/* Fins */}
          <ellipse cx="50" cy="85" rx="20" ry="8" fill="currentColor" opacity="0.6" />
          
          {/* Diving mask */}
          <circle cx="50" cy="35" r="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.9" />
          <circle cx="47" cy="35" r="2" fill="currentColor" opacity="0.9" />
          <circle cx="53" cy="35" r="2" fill="currentColor" opacity="0.9" />
        </svg>
      </div>

      {/* Bubbles */}
      {bubbles}

      {/* Water surface effect */}
      <div 
        className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-500/30 to-transparent"
        style={{
          transform: `translateY(${-swimmingDepth * 0.5}px)`,
        }}
      />

      {/* Depth lines */}
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="absolute left-0 w-full h-px bg-blue-400/20"
          style={{
            top: `${20 + i * 20}%`,
            transform: `translateY(${-swimmingDepth * 0.3}px)`,
          }}
        />
      ))}

      {/* Marine life particles */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`fish-${i}`}
          className="absolute text-blue-300/40"
          style={{
            left: `${10 + i * 12}%`,
            bottom: `${swimmingDepth + i * 8}vh`,
            transform: `translateX(${Math.sin(i * 0.8) * 20}px)`,
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      ))}
    </div>
  );
}
