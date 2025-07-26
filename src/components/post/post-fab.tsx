'use client';

import { ArrowUp } from 'lucide-react';

import { useEffect, useState } from 'react';

export default function PostFab() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 클라이언트 측 하이드레이션 완료 확인
  useEffect(() => {
    setMounted(true);
  }, []);

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    if (!mounted) return;

    // 실제 스크롤되는 컨테이너 요소 찾기
    const scrollContainer = document.querySelector('div.overflow-auto');
    if (!scrollContainer) {
      console.error('스크롤 컨테이너를 찾을 수 없습니다.');
      return;
    }

    const handleScroll = () => {
      // 스크롤 위치가 200px 이상이면 FAB 버튼 표시
      const scrollTop = scrollContainer.scrollTop;
      const shouldShow = scrollTop > 200;

      setShowScrollTop(shouldShow);
    };

    // 초기 스크롤 위치 확인
    handleScroll();

    // 스크롤 컨테이너에 이벤트 리스너 추가
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // 최상단으로 스크롤
  const scrollToTop = () => {
    const scrollContainer = document.querySelector('div.overflow-auto');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  return (
    <>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600"
          aria-label="맨 위로 스크롤"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
