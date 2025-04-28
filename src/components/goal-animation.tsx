'use client';

import { gsap } from 'gsap';

import { useEffect, useRef, useState } from 'react';

export default function GoalAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const goalTextRef = useRef<HTMLDivElement>(null);
  const netRef = useRef<HTMLDivElement>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // 5초 후에 애니메이션 시작
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showAnimation || !containerRef.current || !ballRef.current || !goalTextRef.current || !netRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // 애니메이션 완료 후 3초 뒤에 숨김
        setTimeout(() => {
          setShowAnimation(false);
        }, 3000);
      },
    });

    // 골대 네트 애니메이션
    tl.from(netRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
    });

    // 공 슛 애니메이션
    tl.fromTo(
      ballRef.current,
      {
        x: -100,
        y: 100,
        scale: 0.5,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.in',
      },
    );

    // 네트 흔들림 애니메이션
    tl.to(netRef.current, {
      scaleX: 1.05,
      scaleY: 0.95,
      duration: 0.2,
      ease: 'elastic.out(1, 0.3)',
    });

    // GOAL! 텍스트 애니메이션
    tl.fromTo(
      goalTextRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      },
      '-=0.1',
    );

    // 텍스트 펄스 애니메이션
    tl.to(goalTextRef.current, {
      scale: 1.1,
      duration: 0.3,
      repeat: 3,
      yoyo: true,
    });
  }, [showAnimation]);

  if (!showAnimation) return null;

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative flex h-48 w-64 items-center justify-center">
        {/* 골대 네트 */}
        <div
          ref={netRef}
          className="absolute h-full w-full overflow-hidden rounded-t-lg border-l-4 border-r-4 border-t-4 border-white"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
          }}
        >
          {/* 네트 패턴 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
            }}
          />
        </div>

        {/* 축구공 */}
        <div
          ref={ballRef}
          className="absolute z-10 h-12 w-12 rounded-full bg-white"
          style={{
            background: `radial-gradient(circle at 30% 30%, white 0%, white 20%, #10b981 30%, black 60%, black 100%)`,
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* 축구공 패턴 */}
          <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black" />
          <div className="absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 transform rounded-full bg-black" />
          <div className="absolute bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 transform rounded-full bg-black" />
          <div className="absolute left-1 top-1/2 h-2 w-2 -translate-y-1/2 transform rounded-full bg-black" />
          <div className="absolute right-1 top-1/2 h-2 w-2 -translate-y-1/2 transform rounded-full bg-black" />
        </div>

        {/* GOAL! 텍스트 */}
        <div
          ref={goalTextRef}
          className="absolute top-[-80px] z-20 text-6xl font-bold text-green-500"
          style={{ textShadow: '0 0 10px rgba(16, 185, 129, 0.7), 0 0 20px rgba(16, 185, 129, 0.5)' }}
        >
          GOAL!
        </div>
      </div>
    </div>
  );
}
