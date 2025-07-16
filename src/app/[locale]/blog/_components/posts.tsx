import PostCard from './post-card';

interface IPostsProps {
  posts: {
    title: string;
    slug: string;
    publishTime: string;
    status: string;
    tags: string[];
    thumbnail: string;
  }[];
}

export default function Posts({ posts }: IPostsProps) {
  return (
    <>
      {/* 포스트 목록 */}
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
