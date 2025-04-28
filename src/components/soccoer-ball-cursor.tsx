'use client';

import { useEffect, useRef } from 'react';

interface SoccerBallCursorProps {
  position: { x: number; y: number };
}

export default function SoccerBallCursor({ position }: SoccerBallCursorProps) {
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ballRef.current) {
      ballRef.current.style.transform = `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`;
    }
  }, [position]);

  return (
    <div
      ref={ballRef}
      className="pointer-events-none fixed z-50 h-10 w-10 rounded-full mix-blend-difference"
      style={{
        left: 0,
        top: 0,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="animate-spin-slow relative h-full w-full">
        <div className="h-full w-full rounded-full bg-white opacity-80" />
        <div className="absolute inset-0 h-full w-full">
          {/* 축구공 패턴 */}
          <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black" />
          <div className="absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 transform rounded-full bg-black" />
          <div className="absolute bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 transform rounded-full bg-black" />
          <div className="absolute left-1 top-1/2 h-2 w-2 -translate-y-1/2 transform rounded-full bg-black" />
          <div className="absolute right-1 top-1/2 h-2 w-2 -translate-y-1/2 transform rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}
