import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import AdBanner from '@/components/banner/ad-banner';
import PostBack from '@/components/post/post-back';
import PostBody from '@/components/post/post-body';
import PostFab from '@/components/post/post-fab';
import PostHeader from '@/components/post/post-header';
import PostNavigation from '@/components/post/post-navigation';
import TableOfContents from '@/components/post/table-of-contents';
import { getAllMarkdownPosts } from '@/lib/post';
import { LINKS } from '@/utils/ad-links';

import 'prismjs/themes/prism-tomorrow.css';

export const generateMetadata = ({ params }: { params: { slug: string; locale: string } }): Metadata => {
  const posts = getAllMarkdownPosts();
  const post = posts.find((post) => post.slug === params.slug);
  if (!post) return {};

  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://zeromountain.pro';
  const url = `${baseUrl}/${params.locale}/blog/${params.slug}`;
  const imageUrl = post.thumbnail || `${baseUrl}/default.webp`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    authors: [{ name: 'zeromountain' }],
    creator: 'zeromountain',
    publisher: 'zeromountain',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        ko: `${baseUrl}/ko/blog/${params.slug}`,
        en: `${baseUrl}/en/blog/${params.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: url,
      siteName: 'zeromountain',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: params.locale,
      type: 'article',
      publishedTime: post.publishTime,
      modifiedTime: post.publishTime,
      authors: ['zeromountain'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
      creator: '@zeromountain',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // verification: {
    //   google: 'your-google-verification-code',
    //   yandex: 'your-yandex-verification-code',
    //   yahoo: 'your-yahoo-verification-code',
    // },
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

  // 구조화된 데이터 생성
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';

  // 블로그 포스트 구조화된 데이터
  const blogPostData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.thumbnail,
    author: {
      '@type': 'Person',
      name: 'zeromountain',
      url: `${baseUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'zeromountain',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: post.publishTime,
    dateModified: post.publishTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/${params.locale}/blog/${params.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.tags[0] || 'General',
    wordCount: post.content.split(' ').length,
    timeRequired: `PT${post.readingTime}M`,
    ...(prevPost && {
      previousItem: {
        '@type': 'BlogPosting',
        url: `${baseUrl}/${params.locale}/blog/${prevPost.slug}`,
        headline: prevPost.title,
      },
    }),
    ...(nextPost && {
      nextItem: {
        '@type': 'BlogPosting',
        url: `${baseUrl}/${params.locale}/blog/${nextPost.slug}`,
        headline: nextPost.title,
      },
    }),
  };

  // Breadcrumb 구조화된 데이터
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '홈',
        item: `${baseUrl}/${params.locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '블로그',
        item: `${baseUrl}/${params.locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${baseUrl}/${params.locale}/blog/${params.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <div className="relative">
        <div className="mx-auto max-w-2xl overflow-auto px-4">
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
        {/* ToC - 우측 고정 */}
        <TableOfContents content={post.content} />
      </div>
    </>
  );
}
