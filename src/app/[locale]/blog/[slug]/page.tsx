import { notFound } from 'next/navigation';

import AdBanner from '@/components/banner/ad-banner';
import PostBack from '@/components/post/post-back';
import PostBody from '@/components/post/post-body';
import PostFab from '@/components/post/post-fab';
import PostHeader from '@/components/post/post-header';
import PostNavigation from '@/components/post/post-navigation';
import { getAllMarkdownPosts } from '@/lib/post';
import { LINKS } from '@/utils/ad-links';

import 'prismjs/themes/prism-tomorrow.css';

export const generateMetadata = ({ params }: { params: { slug: string; locale: string } }) => {
  const posts = getAllMarkdownPosts();
  const post = posts.find((post) => post.slug === params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(','),
  };
};

export const generateStaticParams = async () => {
  const locales = ['ko', 'en'];
  const posts = getAllMarkdownPosts();
  const paths = [];

  // 각 로케일과 슬러그의 조합으로 경로 생성
  for (const locale of locales) {
    for (const post of posts) {
      paths.push({
        locale,
        slug: post.slug,
      });
    }
  }

  return paths;
};

export default function PostPage({ params }: { params: { slug: string; locale: string } }) {
  // 현재 포스트 찾기
  const posts = getAllMarkdownPosts();
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return notFound();
  }

  // 날짜순으로 정렬된 모든 게시물 목록
  const sortedPosts = posts
    .filter((p) => p.status === 'Live')
    .sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime());

  // 현재 포스트의 인덱스 찾기
  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);

  // 이전 및 다음 포스트 찾기
  const prevPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;

  return (
    <div className="mx-auto max-w-4xl overflow-auto px-4">
      <PostBack />
      {/* 헤더 섹션 */}
      <PostHeader
        title={post.title}
        tags={post.tags}
        date={post.publishTime}
        readingTime={post.readingTime.toString()}
      />
      <AdBanner category={post.tags[0] as keyof typeof LINKS} />
      {/* 블로그 컨텐츠 */}
      <article className="prose prose-lg mx-auto max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-primary-600 prose-code:rounded-md prose-code:bg-gray-100 prose-code:p-1 prose-code:font-normal prose-code:text-primary-700 prose-pre:overflow-x-auto prose-pre:rounded-lg prose-img:rounded-lg dark:prose-headings:text-gray-100 dark:prose-a:text-primary-400 dark:prose-code:bg-gray-800 dark:prose-code:text-primary-400">
        <PostBody content={post.content} />
      </article>
      <PostNavigation post={post} prevPost={prevPost} nextPost={nextPost} />
      <PostFab />
    </div>
  );
}
