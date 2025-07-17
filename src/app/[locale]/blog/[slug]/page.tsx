import { allPosts } from 'contentlayer/generated';

import { notFound } from 'next/navigation';

import { getAllMarkdownPosts } from '@/lib/post';

import PostNavigation from './_components/post-navigation';

import 'prismjs/themes/prism-tomorrow.css';

export const generateMetadata = ({ params }: { params: { slug: string; locale: string } }) => {
  const posts = getAllMarkdownPosts('content/posts');
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
  const posts = getAllMarkdownPosts('content/posts');
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
  const posts = getAllMarkdownPosts('content/posts');
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

  return <PostNavigation post={post} prevPost={prevPost} nextPost={nextPost} />;
}
