import { Suspense } from 'react';

import { getAllMarkdownPosts } from '@/lib/post';

import PostCardSkeleton from './_components/post-card-skeleton';
import Posts from './_components/posts';

export default function PostPage() {
  const posts = getAllMarkdownPosts('content/posts');

  // console.log(
  //   posts,
  //   posts.map((p) => p.tags),
  // );

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
