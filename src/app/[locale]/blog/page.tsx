'use client';

import { allPosts } from 'contentlayer/generated';

import { notFound } from 'next/navigation';

import { Suspense, useEffect, useState } from 'react';

import PostCard from './_components/post-card';
import PostCardSkeleton from './_components/post-card-skeleton';

export default function PostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
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
  // 모든 포스트에서 고유한 카테고리 목록 추출
  const allCategories = Array.from(
    new Set(allPosts.filter((post) => post.status === 'Live').map((post) => post.category)),
  )
    .filter(Boolean)
    .sort() as string[];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState(allPosts);

  // 카테고리 선택 처리
  const selectCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  // 선택된 태그 및 카테고리에 따라 포스트 필터링
  useEffect(() => {
    const filtered = allPosts
      .filter((post) => post.status === 'Live')
      .filter(
        (post) =>
          (selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag))) &&
          (selectedCategory === null || post.category === selectedCategory),
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setFilteredPosts(filtered);
  }, [selectedTags, selectedCategory]);

  // 모든 필터 초기화
  const clearAllFilters = () => {
    setSelectedTags([]);
    setSelectedCategory(null);
  };

  if (!allPosts || allPosts.length === 0) return notFound();

  return (
    <>
      {/* 카테고리 필터 UI */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 font-medium text-gray-700 dark:text-gray-300">카테고리:</span>
          <button
            onClick={() => selectCategory(null)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              selectedCategory === null
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            전체
          </button>
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => selectCategory(category)}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 포스트 목록 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <div className="col-span-full py-8 text-center text-gray-500 dark:text-gray-400">
            <p>선택한 필터에 해당하는 포스트가 없습니다.</p>
            <button
              onClick={clearAllFilters}
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
