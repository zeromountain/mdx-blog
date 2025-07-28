import { useCallback, useEffect } from 'react';

import { updateUrlHash } from '@/utils/toc';

/**
 * URL 해시 변경시 스크롤을 처리하는 커스텀 훅
 */
export const useHashScroll = (offset: number = -100) => {
  // 해시로 스크롤하는 함수
  const scrollToHash = useCallback(
    (hash: string, smooth: boolean = true) => {
      const id = hash.startsWith('#') ? hash.substring(1) : hash;
      const element = document.getElementById(id);

      if (!element) {
        console.warn(`Element with id "${id}" not found`);
        return false;
      }

      // 요소가 실제로 존재하는지 확인
      const rect = element.getBoundingClientRect();
      if (rect.height === 0) {
        console.warn(`Element with id "${id}" has no height`);
        return false;
      }

      // 스크롤 위치 계산
      const scrollPosition = rect.top + window.scrollY + offset;

      console.log('scrollToHash', hash, id, scrollPosition, {
        rectTop: rect.top,
        scrollY: window.scrollY,
        offset,
        elementHeight: rect.height,
      });

      try {
        if (smooth) {
          // 부드러운 스크롤
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });

          // 추가 오프셋 적용
          setTimeout(() => {
            const currentScrollY = window.scrollY;
            const targetScrollY = currentScrollY + offset;
            window.scrollTo({
              top: targetScrollY,
              behavior: 'smooth',
            });
          }, 100);
        } else {
          // 즉시 스크롤
          window.scrollTo({
            top: scrollPosition,
            behavior: 'auto',
          });
        }
        return true;
      } catch (error) {
        console.error('Scroll error:', error);
        return false;
      }
    },
    [offset],
  );

  // URL 해시 변경 감지 및 스크롤 처리
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        // DOM이 완전히 로드된 후 스크롤 실행
        setTimeout(() => {
          scrollToHash(window.location.hash, true);
        }, 200);
      }
    };

    // 초기 로드 시 해시가 있으면 스크롤
    if (window.location.hash) {
      // 페이지 로드 완료 후 스크롤
      const handleInitialScroll = () => {
        setTimeout(() => {
          scrollToHash(window.location.hash, true);
        }, 300);
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleInitialScroll);
        return () => document.removeEventListener('DOMContentLoaded', handleInitialScroll);
      } else {
        handleInitialScroll();
      }
    }

    // 해시 변경 이벤트 리스너 등록
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [scrollToHash]);

  // 외부에서 호출할 수 있는 스크롤 함수 반환
  return {
    scrollToHash,
    updateHash: updateUrlHash,
  };
};
