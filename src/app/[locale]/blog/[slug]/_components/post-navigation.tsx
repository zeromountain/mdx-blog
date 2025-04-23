'use client';

import { Post } from 'contentlayer/generated';
import { format } from 'date-fns';
import { ArrowLeft, ArrowUp, Calendar, Clock } from 'lucide-react';

import { useEffect, useState } from 'react';

import { Link } from '@/app/i18n/routing';
import { MDXContent } from '@/components/mdx-content';

interface PostNavigationProps {
  post: Post;
  prevPost: Post | null;
  nextPost: Post | null;
}

export default function PostNavigation({ post, prevPost, nextPost }: PostNavigationProps) {
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
      console.log('스크롤 위치:', scrollTop, '버튼 표시:', shouldShow);
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

  // 날짜 포맷 함수 - 서버와 클라이언트 측 렌더링 일치를 위해 함수 분리
  const formatDate = (dateString: string) => {
    if (!mounted) return ''; // 클라이언트에서 하이드레이션 완료 전에는 빈 문자열 반환

    const date = new Date(dateString);
    return format(date, 'yyyy년 MM월 dd일');
  };

  return (
    <div className="mx-auto max-w-4xl px-4">
      {/* 뒤로 가기 버튼 */}
      <div className="mb-8 mt-6">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          목록으로 돌아가기
        </Link>
      </div>

      {/* 헤더 섹션 */}
      <div className="mb-12 border-b border-gray-200 pb-8 dark:border-gray-800">
        {/* 태그 */}
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-100 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 제목 */}
        <h1 className="mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-gray-100 dark:to-gray-400 md:text-5xl">
          {post.title}
        </h1>

        {/* 메타데이터 */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>{mounted ? formatDate(post.date) : ''}</time>
          </div>
          {mounted && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* 블로그 컨텐츠 */}
      <article className="prose prose-lg mx-auto max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-primary-600 prose-code:rounded-md prose-code:bg-gray-100 prose-code:p-1 prose-code:font-normal prose-code:text-primary-700 prose-pre:overflow-x-auto prose-pre:rounded-lg prose-img:rounded-lg dark:prose-headings:text-gray-100 dark:prose-a:text-primary-400 dark:prose-code:bg-gray-800 dark:prose-code:text-primary-400">
        <MDXContent code={post.body.code} />
      </article>

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
              <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(prevPost.date)}</span>
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
              <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(nextPost.date)}</span>
            </Link>
          )}
        </div>
      )}

      {/* 최상단으로 이동 FAB 버튼 */}
      {mounted && showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-all hover:bg-primary-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-700 dark:hover:bg-primary-600"
          aria-label="맨 위로 스크롤"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
