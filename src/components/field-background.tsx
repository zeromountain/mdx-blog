'use client';

import { gsap } from 'gsap';

import { useEffect, useRef } from 'react';

export default function FieldBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 배경 필드 애니메이션
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 0.15, duration: 2, ease: 'power2.out' });

    // 마우스 움직임에 따른 시차 효과
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const xValue = (e.clientX - window.innerWidth / 2) / 30;
      const yValue = (e.clientY - window.innerHeight / 2) / 30;

      gsap.to(containerRef.current, {
        x: xValue,
        y: yValue,
        duration: 1,
        ease: 'power1.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-0">
      {/* 축구장 배경 */}
      <div className="absolute inset-0 bg-[#0a3b0a] opacity-10" />

      {/* 잔디 패턴 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 50px,
              rgba(16, 185, 129, 0.05) 50px,
              rgba(16, 185, 129, 0.05) 100px
            )
          `,
        }}
      />

      {/* 필드 라인 */}
      <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 transform bg-white/10" />
      <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 transform bg-white/10" />

      {/* 중앙원 */}
      <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white/10" />

      {/* 코너 아크 */}
      <div className="absolute left-0 top-0 h-[50px] w-[50px] rounded-br-full border-r-2 border-white/10" />
      <div className="absolute right-0 top-0 h-[50px] w-[50px] rounded-bl-full border-l-2 border-white/10" />
      <div className="absolute bottom-0 left-0 h-[50px] w-[50px] rounded-tr-full border-r-2 border-white/10" />
      <div className="absolute bottom-0 right-0 h-[50px] w-[50px] rounded-tl-full border-l-2 border-white/10" />

      {/* 골 에어리어 */}
      <div className="absolute left-0 top-1/4 h-[50%] w-[150px] border-y-2 border-r-2 border-white/10" />
      <div className="absolute right-0 top-1/4 h-[50%] w-[150px] border-y-2 border-l-2 border-white/10" />
    </div>
  );
}
