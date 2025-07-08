'use client';

import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';

export default function Home() {
  const t = useTranslations('common');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* 배경 풋살장 */}
      <div className="absolute inset-0 bg-green-900/20">
        <div className="absolute inset-0 bg-[url('/field-pattern.jpeg')] bg-cover bg-center opacity-10" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex h-[calc(100vh-60px)] flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-200 md:text-6xl">
            {t('greeting')} <span className="inline-block animate-wave">👋</span>
          </h1>

          <h2 className="mb-6 text-2xl text-gray-300 md:text-3xl">{t('subtitle')}</h2>

          <p className="mx-auto max-w-2xl whitespace-pre-line text-lg text-gray-400 md:text-xl">{t('description')}</p>
        </div>

        {/* 축구공 이모지 */}
        <div
          className="z-1000 pointer-events-none fixed text-4xl transition-all duration-200 ease-out"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
            transform: isClicked ? 'scale(1.5)' : 'scale(1)',
          }}
        >
          ⚽️
        </div>
      </div>

      {/* 스크롤 안내 */}
      {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 transform text-center">
        <p className="mb-2 text-sm text-white/50">스크롤하여 더 알아보기</p>
        <div className="mx-auto h-6 w-6 animate-bounce text-white/70">↓</div>
      </div> */}
    </div>
  );
}
