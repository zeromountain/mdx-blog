import { useEffect, useState } from 'react';
import type { TocItem } from '@/utils/toc';

/**
 * 현재 보이는 헤딩을 추적하는 커스텀 훅
 */
export const useActiveHeading = (headings: TocItem[]) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries.filter((entry) => entry.isIntersecting);

          if (visibleEntries.length > 0) {
            // Y 위치가 가장 작은 (위에 있는) 요소를 활성화
            const topEntry = visibleEntries.reduce((prev, current) =>
              prev.boundingClientRect.y < current.boundingClientRect.y ? prev : current,
            );
            setActiveId(topEntry.target.id);
          } else {
            // 화면에 보이는 헤딩이 없을 때 가장 가까운 헤딩 찾기
            findClosestHeading(headings, setActiveId);
          }
        },
        {
          rootMargin: '-10% 0px -10% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        },
      );

      // 모든 헤딩 요소 관찰
      const elements: Element[] = [];
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          elements.push(element);
          observer.observe(element);
        }
      });

      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [headings]);

  return activeId;
};

/**
 * 스크롤 위치에 가장 가까운 헤딩을 찾습니다.
 */
const findClosestHeading = (headings: TocItem[], setActiveId: (id: string) => void) => {
  const windowHeight = window.innerHeight;
  let closestHeading = null;
  let minDistance = Infinity;

  headings.forEach(({ id }) => {
    const element = document.getElementById(id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const distance = Math.abs(rect.top);

      // 화면 하단에 있는 마지막 헤딩도 고려
      if (rect.bottom <= windowHeight && rect.bottom > 0) {
        const bottomDistance = windowHeight - rect.bottom;
        if (bottomDistance < minDistance) {
          minDistance = bottomDistance;
          closestHeading = id;
        }
      }

      // 일반적인 경우
      if (rect.top <= 100 && rect.top > -100) {
        if (distance < minDistance) {
          minDistance = distance;
          closestHeading = id;
        }
      }
    }
  });

  if (closestHeading) {
    setActiveId(closestHeading);
  }
};