import { MarkdownPost } from '@/lib/post';

import PostCard from './post-card';

interface IPostsProps {
  posts: MarkdownPost[];
}

export default function Posts({ posts }: IPostsProps) {
  return (
    <>
      {/* 포스트 목록 */}
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-black dark:text-gray-100">Blog</h2>
        <p className="text-sm text-gray-500 dark:text-gray-100">학습한 내용을 기록합니다.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post, index) => <PostCard key={`${post.title}-${index}`} post={post} />)
        ) : (
          <div className="col-span-full py-8 text-center text-gray-500 dark:text-gray-400">
            <p>등록된 포스트가 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}
