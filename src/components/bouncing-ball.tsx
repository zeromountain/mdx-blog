'use client';

import { gsap } from 'gsap';

import { useEffect, useRef } from 'react';

export default function BouncingBall() {
  const ballRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ballRef.current || !containerRef.current) return;

    const ball = ballRef.current;
    const container = containerRef.current;

    // 초기 위치 및 속도 설정
    let posX = Math.random() * (container.offsetWidth - 40);
    let posY = Math.random() * (container.offsetHeight - 40);
    let velX = (Math.random() - 0.5) * 5;
    let velY = (Math.random() - 0.5) * 5;

    // 중력 및 마찰 설정
    const gravity = 0.2;
    const friction = 0.99;
    const bounce = 0.8;

    // 공의 초기 위치 설정
    gsap.set(ball, { x: posX, y: posY });

    // 애니메이션 프레임
    const animate = () => {
      if (!ball || !container) return;

      // 속도 업데이트
      velY += gravity;

      // 위치 업데이트
      posX += velX;
      posY += velY;

      // 벽과의 충돌 감지 및 처리
      if (posX <= 0 || posX >= container.offsetWidth - 40) {
        velX = -velX * bounce;
        posX = posX <= 0 ? 0 : container.offsetWidth - 40;
      }

      if (posY <= 0 || posY >= container.offsetHeight - 40) {
        velY = -velY * bounce;
        posY = posY <= 0 ? 0 : container.offsetHeight - 40;
      }

      // 마찰 적용
      velX *= friction;
      velY *= friction;

      // 공 위치 업데이트
      gsap.set(ball, { x: posX, y: posY });

      // 다음 프레임 요청
      requestAnimationFrame(animate);
    };

    // 애니메이션 시작
    const animationId = requestAnimationFrame(animate);

    // 클린업
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-hidden">
      <div
        ref={ballRef}
        className="absolute h-10 w-10 rounded-full"
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
    </div>
  );
}
