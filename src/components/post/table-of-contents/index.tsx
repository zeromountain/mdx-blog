'use client';

import { useCallback, useEffect } from 'react';

import { useActiveHeading } from '@/hooks/use-active-heading';
import { useHashScroll } from '@/hooks/use-hash-scroll';
import { extractHeadings } from '@/utils/toc';

import TocNav from './toc-nav';

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const headings = extractHeadings(content);
  const activeId = useActiveHeading(headings);

  // URL 해시가 있을 때 스크롤 처리
  const { updateHash, scrollToHash } = useHashScroll(-120);

  const handleItemClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();

      // URL 해시 업데이트
      updateHash(id);
      
      // 스크롤 실행
      setTimeout(() => {
        scrollToHash(id);
      }, 50);
    },
    [updateHash, scrollToHash],
  );

  // 디버깅용 - 나중에 제거
  useEffect(() => {
    if (activeId) {
      console.log('Active heading changed:', activeId);
    }
  }, [activeId]);

  if (headings.length === 0) return null;

  return (
    <aside className="not-prose fixed right-8 top-32 z-50 hidden xl:block">
      <TocNav headings={headings} activeId={activeId} onItemClick={handleItemClick} />
    </aside>
  );
}
