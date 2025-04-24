'use client';

import { allAbouts } from 'contentlayer/generated';
import { ArrowLeft } from 'lucide-react';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { MDXContent } from '@/components/mdx-content';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  // 현재 로케일 가져오기
  const routeParams = useParams();
  const locale = routeParams.locale as string;

  // 클라이언트 사이드 렌더링 시 사용할 상태
  const [mounted, setMounted] = useState(false);
  const [projectContent, setProjectContent] = useState<any>(null);

  // 컴포넌트가 마운트된 후에만 MDX 콘텐츠를 렌더링
  useEffect(() => {
    // 콘텐츠 로드 - 단순 슬러그 비교 대신 슬러그 끝부분만 비교
    const slugToFind = params.slug;
    const project = allAbouts.find(
      (about) => about.section === 'projects' && (about.slug === slugToFind || about.slug.endsWith(`/${slugToFind}`)),
    );

    if (project) {
      setProjectContent(project);
    }
    setMounted(true);

    return () => {
      setMounted(false);
      setProjectContent(null);
    };
  }, [params.slug]);

  // 로딩 상태 표시
  if (!mounted) {
    return (
      <div className="mx-auto max-w-2xl px-4">
        <div className="animate-pulse">
          <div className="mb-8 h-6 w-24 bg-gray-200 dark:bg-gray-700" />
          <div className="mb-4 h-10 w-3/4 bg-gray-200 dark:bg-gray-700" />
          <div className="mb-8 h-6 w-full bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    );
  }

  // 프로젝트를 찾지 못한 경우 404 페이지 표시
  if (!projectContent) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4">
      {/* 뒤로 가기 버튼 */}
      <div className="mb-8">
        <Link
          href={`/${locale}/about`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          목록으로 돌아가기
        </Link>
      </div>

      {/* 프로젝트 제목 */}
      <h1 className="mb-4 text-3xl font-bold">{projectContent.title}</h1>

      {/* 설명 (있는 경우) */}
      {projectContent.description && (
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">{projectContent.description}</p>
      )}

      {/* MDX 콘텐츠 안전하게 렌더링 */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <MDXContent code={projectContent.body.code} />
      </div>
    </div>
  );
}
