import { notFound } from 'next/navigation';

import { fetchPages } from '@/lib/notion';
import { Post } from '@/utils/post';

import PostCard from './_components/post-card';

export default async function PostPage() {
  const posts = await fetchPages();

  if (!posts) return notFound();

  return (
    <div className="lx:grid-cols-4 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(Post.create).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
