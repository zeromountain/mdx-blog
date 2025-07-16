import { Suspense } from 'react';

import { getAllMarkdownPosts } from '@/lib/post';

import PostCardSkeleton from './_components/post-card-skeleton';
import Posts from './_components/posts';

export default function PostPage() {
  const posts = getAllMarkdownPosts('content/posts');

  const mappedPosts = posts
    .map((post) => ({
      title: post.title,
      slug: post.slug,
      publishTime: new Date(post.publishTime).toLocaleDateString(),
      publishTimeOriginal: post.publishTime, // 정렬을 위해 원본 시간 보존
      status: post.status,
      tags: post.tags,
      thumbnail: post.cover,
    }))
    .filter((post) => post.status === 'Live')
    .sort((a, b) => {
      // 먼저 발행 시간으로 정렬 (최신순)
      const timeA = new Date(a.publishTimeOriginal).getTime();
      const timeB = new Date(b.publishTimeOriginal).getTime();

      if (timeB !== timeA) {
        return timeB - timeA;
      }

      // 발행 시간이 같으면 slug로 정렬 (알파벳 순)
      return a.slug.localeCompare(b.slug);
    });

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
        <Posts posts={mappedPosts} />
      </Suspense>
    </div>
  );
}
