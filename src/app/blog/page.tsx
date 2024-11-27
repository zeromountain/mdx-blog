import { notFound } from 'next/navigation';

import { Suspense } from 'react';

import { fetchPages } from '@/lib/notion';
import { Post } from '@/utils/post';

import PostCard from './_components/post-card';
import PostCardSkeleton from './_components/post-card-skeleton';

export default function PostPage() {
  return (
    <div className="lx:grid-cols-4 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Suspense
        fallback={[...Array(9)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      >
        <Posts />
      </Suspense>
    </div>
  );
}

async function Posts() {
  const posts = await fetchPages();

  if (!posts) return notFound();

  return (
    <>
      {posts.map(Post.create).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
