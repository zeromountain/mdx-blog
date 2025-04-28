'use client';

import { gsap } from 'gsap';

import { useEffect, useRef, useState } from 'react';

export default function Scoreboard() {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [time, setTime] = useState('00:00');
  const [isVisible, setIsVisible] = useState(false);
  const scoreboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 스코어보드 토글 버튼 (ESC 키)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // 스코어보드 애니메이션
    if (isVisible && scoreboardRef.current) {
      gsap.fromTo(
        scoreboardRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      );
    }

    // 시간 업데이트
    let minutes = 0;
    let seconds = 0;
    let timerId: NodeJS.Timeout;

    if (isVisible) {
      timerId = setInterval(() => {
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
        }

        setTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

        // 랜덤 득점 (약 5% 확률)
        if (Math.random() < 0.005) {
          if (Math.random() < 0.5) {
            setHomeScore((prev) => prev + 1);
            animateScore('home');
          } else {
            setAwayScore((prev) => prev + 1);
            animateScore('away');
          }
        }
      }, 1000);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timerId) clearInterval(timerId);
    };
  }, [isVisible]);

  // 득점 애니메이션
  const animateScore = (team: 'home' | 'away') => {
    const scoreElement = document.getElementById(`${team}-score`);
    if (scoreElement) {
      gsap.fromTo(
        scoreElement,
        { scale: 1.5, color: '#10b981' },
        { scale: 1, color: 'white', duration: 0.5, ease: 'elastic.out(1, 0.3)' },
      );
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={scoreboardRef}
      className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 transform items-center gap-4 rounded-lg border border-green-500 bg-black/80 px-6 py-3 text-white shadow-lg"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <div className="text-center">
        <div className="mb-1 text-xs text-gray-400">HOME</div>
        <div id="home-score" className="text-2xl font-bold">
          {homeScore}
        </div>
      </div>

      <div className="border-x border-gray-700 px-4 text-center">
        <div className="mb-1 text-xs text-gray-400">TIME</div>
        <div className="font-mono text-xl">{time}</div>
      </div>

      <div className="text-center">
        <div className="mb-1 text-xs text-gray-400">AWAY</div>
        <div id="away-score" className="text-2xl font-bold">
          {awayScore}
        </div>
      </div>

      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 transform rounded-b-md bg-black/80 px-2 py-1 text-xs text-gray-400">
        ESC 키로 토글
      </div>
    </div>
  );
}
