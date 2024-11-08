'use client';

import dayjs from 'dayjs';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { IPost } from '@/types/post';

import TagChip from './tag-chip';

type PostCardProps = {
  post: IPost;
};

export default function PostCard({ post }: PostCardProps) {
  const { id, cover, title, publishTime, icon, tags } = post;

  return (
    <Link href={`/blog/${id}`} className="block h-min">
      <article className="clickable w-320 flex flex-col items-center rounded-sm shadow-lg hover:-translate-x-1 hover:-translate-y-1">
        <div className={`relative`}>
          {cover && <Image src={cover} alt="cover" width={320} height={200} style={{ width: 320, height: 200 }} />}
          <p className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 break-words text-center text-lg font-bold text-white">
            {title}
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <time className="text-14 self-end p-4">{dayjs(publishTime).format('YYYY.MM.DD')}</time>
          <Image src={icon} alt="icon" width={24} height={24} />
          <h2 className="w-full truncate px-12 text-center font-bold">{title}</h2>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-4 py-6">
              {tags.map(({ id, name, color }: any) => (
                <TagChip key={id} id={id} name={name} color={color} />
              ))}
            </div>
          )}
        </div>
      </article>
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
