import { allPosts } from 'contentlayer/generated';

import { notFound } from 'next/navigation';

import PostNavigation from './_components/post-navigation';

export const generateMetadata = ({ params }: { params: { slug: string; locale: string } }) => {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
  };
};

export const generateStaticParams = async () => {
  const locales = ['ko', 'en'];
  const paths = [];

  // 각 로케일과 슬러그의 조합으로 경로 생성
  for (const locale of locales) {
    for (const post of allPosts) {
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
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    console.log('포스트를 찾을 수 없습니다:', params.slug);
    console.log(
      '사용 가능한 포스트들:',
      allPosts.map((p) => p.slug),
    );
    return notFound();
  }

  // 날짜순으로 정렬된 모든 게시물 목록
  const sortedPosts = allPosts
    .filter((p) => p.status === 'Live')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 현재 포스트의 인덱스 찾기
  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);

  // 이전 및 다음 포스트 찾기
  const prevPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;

  return <PostNavigation post={post} prevPost={prevPost} nextPost={nextPost} />;
}
