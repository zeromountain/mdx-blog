'use client';

import { allPosts } from 'contentlayer/generated';
import { X } from 'lucide-react';

import { notFound } from 'next/navigation';

import { Suspense, useEffect, useState } from 'react';

import PostCard from './_components/post-card';
import PostCardSkeleton from './_components/post-card-skeleton';

export default function PostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">블로그</h1>
      <Suspense
        fallback={
          <>
            <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(9)].map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          </>
        }
      >
        <Posts />
      </Suspense>
    </div>
  );
}

function Posts() {
  // 모든 포스트에서 고유한 태그 목록 추출
  const allTags = Array.from(
    new Set(allPosts.filter((post) => post.status === 'Live').flatMap((post) => post.tags)),
  ).sort();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState(allPosts);

  // 태그 선택/해제 처리
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  // 선택된 태그에 따라 포스트 필터링
  useEffect(() => {
    const filtered = allPosts
      .filter((post) => post.status === 'Live')
      .filter((post) => selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag)))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setFilteredPosts(filtered);
  }, [selectedTags]);

  // 모든 필터 초기화
  const clearAllTags = () => {
    setSelectedTags([]);
  };

  if (!allPosts || allPosts.length === 0) return notFound();

  return (
    <>
      {/* 태그 필터 UI */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 font-medium text-gray-700 dark:text-gray-300">태그 필터:</span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button
              onClick={clearAllTags}
              className="ml-2 flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <X className="h-3 w-3" /> 초기화
            </button>
          )}
        </div>

        {/* 선택된 태그 표시 */}
        {selectedTags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">선택된 태그:</span>
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-xs text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
              >
                {tag}
                <button
                  onClick={() => toggleTag(tag)}
                  className="ml-1 rounded-full p-0.5 hover:bg-primary-200 dark:hover:bg-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 포스트 목록 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <div className="col-span-full py-8 text-center text-gray-500 dark:text-gray-400">
            <p>선택한 태그에 해당하는 포스트가 없습니다.</p>
            <button
              onClick={clearAllTags}
              className="mt-2 font-medium text-primary-600 hover:underline dark:text-primary-400"
            >
              모든 포스트 보기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
