import { generateHeadingId } from './heading-id';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * 마크다운 컨텐츠에서 헤딩을 추출합니다.
 */

export const extractHeadings = (markdown: string): TocItem[] => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const extracted: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = generateHeadingId(text);

    extracted.push({ id, text, level });
  }

  return extracted;
};

/**
 * 부드러운 스크롤 애니메이션을 수행합니다.
 */
export const smoothScrollTo = (targetY: number, duration: number = 800) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);
    
    window.scrollTo(0, startY + distance * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

/**
 * 요소의 스크롤 위치를 계산합니다.
 */
export const getScrollPosition = (elementId: string, offset: number = -100): number | null => {
  const element = document.getElementById(elementId);
  if (!element) return null;
  
  return element.getBoundingClientRect().top + window.scrollY + offset;
};

/**
 * URL 해시를 업데이트합니다.
 */
export const updateUrlHash = (hash: string) => {
  history.pushState(null, '', `#${hash}`);
};