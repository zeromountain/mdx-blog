'use client';

import { Card, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';

import Image from 'next/image';

import { Link } from '@/app/i18n/routing';
import { MarkdownPost } from '@/lib/post';

interface PostCardProps {
  post: MarkdownPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <Card className="h-full p-5 hover:bg-default-50">
        <CardHeader>
          <Image
            src={post.thumbnail}
            alt={post.title}
            width={100}
            height={100}
            className="h-40 w-full object-cover"
            unoptimized
          />
        </CardHeader>
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  className="bg-primary-50 text-sm text-primary-500 dark:bg-primary-900/30 dark:text-primary-400"
                >
                  {tag}
                </Chip>
              ))}
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">{post.title}</h3>
          </div>
          <div className="mt-4 flex flex-row items-center justify-between">
            <p className="text-xs text-gray-500">{post.publishTime}</p>
            <p className="text-xs text-gray-500">{post.readingTime} min</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
