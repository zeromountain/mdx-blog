'use client';

import { Post } from 'contentlayer/generated';
import { format } from 'date-fns';

import { Card } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';

import { Link } from '@/app/i18n/routing';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // URL에서 /blog/ 부분 이후만 추출 (slug)
  const slug = post.url.replace('/blog/', '');

  return (
    <Link href={`/blog/${slug}`} className="block">
      <Card className="h-full p-5 hover:bg-default-50">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="mb-4 flex">
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  className="mr-2 bg-primary-100 text-xs text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
                >
                  {tag}
                </Chip>
              ))}
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">{post.title}</h3>
            <p className="text-xs text-gray-500">{post.description}</p>
          </div>
          <div className="mt-4 flex flex-row items-center justify-between">
            <p className="text-xs text-gray-500">{format(new Date(post.date), 'yyyy.MM.dd')}</p>
            <p className="text-xs text-gray-500">{post.readingTime.text}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

// export function PostCardSkeleton() {
//   return (
//     <div className="skeleton-card w-320 h-300 space-y-4 rounded-lg bg-gray-100 p-4">
//       <div className="skeleton-image h-44 w-full animate-pulse rounded-lg bg-gray-200" />
//       <div className="skeleton-text-line h-5 w-full animate-pulse rounded bg-gray-200" />
//       <div className="skeleton-text-line short h-5 w-3/5 animate-pulse rounded bg-gray-200" />
//       <div className="skeleton-tags flex space-x-2">
//         <div className="skeleton-tag h-5 w-12 animate-pulse rounded bg-gray-200" />
//         <div className="skeleton-tag h-5 w-12 animate-pulse rounded bg-gray-200" />
//       </div>
//     </div>
//   );
// }
