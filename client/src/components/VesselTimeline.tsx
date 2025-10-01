import React, { useRef } from 'react';
import { VesselCard, VesselDetails } from './PortfolioCards';
import { DiverBackground } from './DiverBackground';

interface VesselTimelineProps {
  vessels: VesselDetails[];
  scrollProgress: number;
  onVesselClick: (vessel: VesselDetails) => void;
}

export function VesselTimeline({ vessels, scrollProgress, onVesselClick }: VesselTimelineProps) {
  // Calculate dot position based on scroll progress
  const dotPosition = Math.min(Math.max(scrollProgress * 100, 0), 100);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">
      {/* 3D Diver Background */}
      <DiverBackground scrollProgress={scrollProgress} containerRef={containerRef} />


      {/* Vessels Container */}
      <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[3fr_3fr_1fr_3fr_3fr] gap-4 sm:gap-6 lg:gap-8">
        {vessels.map((vessel, index) => {
          // Calculate which side and position within that side
          const sideIndex = Math.floor(index / 2); // Which row (0, 1, 2, ...)
          const positionInSide = index % 2; // Position within the row (0 or 1)
          const isLeft = sideIndex % 2 === 0; // Alternate sides for each row
          
          // For left side: positions 0,1 go to columns 1,2
          // For right side: positions 0,1 go to columns 4,5 (column 3 is the spacer)
          const columnClass = isLeft 
            ? (positionInSide === 0 ? 'lg:col-start-1' : 'lg:col-start-2')
            : (positionInSide === 0 ? 'lg:col-start-4' : 'lg:col-start-5');
          
          return (
            <div
              key={vessel.name}
              className={`relative group z-20 ${columnClass} ${
                isLeft 
                  ? 'lg:justify-self-end lg:mr-2 xl:mr-4' 
                  : 'lg:justify-self-start lg:ml-2 xl:ml-4'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`
              }}
            >

              <VesselCard
                vessel={vessel}
                onClick={() => onVesselClick(vessel)}
                className="hover-elevate"
              />
            </div>
          );
        })}
      </div>

    </div>
  );
}
