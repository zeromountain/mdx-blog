'use client';

import { gsap } from 'gsap';

import { useEffect, useRef } from 'react';

export default function SoccerField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 필드 애니메이션
    gsap.from(fieldRef.current, {
      opacity: 0,
      duration: 1.5,
      delay: 0.5,
    });

    // 마우스 움직임에 따른 시차 효과
    const handleMouseMove = (e: MouseEvent) => {
      if (!fieldRef.current) return;

      const xValue = (e.clientX - window.innerWidth / 2) / 50;
      const yValue = (e.clientY - window.innerHeight / 2) / 50;

      gsap.to(fieldRef.current, {
        x: xValue,
        y: yValue,
        duration: 1,
        ease: 'power1.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={fieldRef} className="absolute inset-0 h-full w-full opacity-20" style={{ zIndex: 1 }}>
      {/* 축구장 디자인 */}
      <div className="absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 transform rounded-lg border-2 border-white/30">
        {/* 중앙선 */}
        <div className="absolute left-0 top-1/2 h-0 w-full -translate-y-1/2 transform border-t-2 border-white/30" />

        {/* 중앙원 */}
        <div className="absolute left-1/2 top-1/2 aspect-square w-[20%] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white/30" />

        {/* 중앙점 */}
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/30" />

        {/* 왼쪽 골대 영역 */}
        <div className="absolute left-0 top-1/2 h-[40%] w-[15%] -translate-y-1/2 transform border-r-2 border-white/30" />

        {/* 오른쪽 골대 영역 */}
        <div className="absolute right-0 top-1/2 h-[40%] w-[15%] -translate-y-1/2 transform border-l-2 border-white/30" />
      </div>
    </div>
  );
}
