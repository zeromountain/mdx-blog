'use client';

import { format } from 'date-fns';

import { useEffect, useState } from 'react';

import { Link } from '@/app/i18n/routing';
import { MarkdownPost } from '@/lib/post';

interface PostNavigationProps {
  post: MarkdownPost;
  prevPost: MarkdownPost | null;
  nextPost: MarkdownPost | null;
}

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  const [mounted, setMounted] = useState(false);

  // 클라이언트 측 하이드레이션 완료 확인
  useEffect(() => {
    setMounted(true);
  }, []);

  // 날짜 포맷 함수 - 서버와 클라이언트 측 렌더링 일치를 위해 함수 분리
  const formatDate = (dateString: string) => {
    if (!mounted) return ''; // 클라이언트에서 하이드레이션 완료 전에는 빈 문자열 반환

    const date = new Date(dateString);
    return format(date, 'yyyy년 MM월 dd일');
  };

  return (
    <div>
      {/* 이전/다음 포스트 네비게이션 */}
      {mounted && (
        <div className="my-12 grid gap-8 border-t border-gray-200 pt-12 dark:border-gray-800 md:grid-cols-2">
          {prevPost && (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group flex flex-col rounded-lg border border-gray-200 p-6 transition-all hover:border-primary-200 hover:bg-primary-50/30 dark:border-gray-800 dark:hover:border-primary-900 dark:hover:bg-primary-900/10"
            >
              <span className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">이전 포스트</span>
              <span className="mb-2 text-lg font-medium text-gray-900 transition-colors group-hover:text-primary-700 dark:text-gray-100 dark:group-hover:text-primary-400">
                {prevPost.title}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(prevPost.publishTime)}</span>
            </Link>
          )}

          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex flex-col items-end rounded-lg border border-gray-200 p-6 text-right transition-all hover:border-primary-200 hover:bg-primary-50/30 dark:border-gray-800 dark:hover:border-primary-900 dark:hover:bg-primary-900/10"
            >
              <span className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">다음 포스트</span>
              <span className="mb-2 text-lg font-medium text-gray-900 transition-colors group-hover:text-primary-700 dark:text-gray-100 dark:group-hover:text-primary-400">
                {nextPost.title}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(nextPost.publishTime)}</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
