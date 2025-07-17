'use client';

import { allAbouts } from 'contentlayer/generated';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useMemo } from 'react';

import EmailIcon from '@/assets/icon/email-icon';
import GithubIcon from '@/assets/icon/github-icon';
import LinkedinIcon from '@/assets/icon/linkedin-icon';
import { AboutSection } from '@/components/about/about-section';

// 임시 프로필 콘텐츠 컴포넌트
function ProfileContent() {
  return (
    <div className="prose prose-lg dark:prose-invert">
      <h2 className="text-2xl font-bold">소개</h2>
      <p className="text-sm text-gray-500 dark:text-gray-100">
        다양한 직군의 팀원들과 협업하며 다양한 경험을 쌓았습니다.
        <br />
        성장을 취우선 가치로 여기며 효율적인 업무 문화를 만들어가는 것을 중요하게 생각합니다.
        <br />
        UI/UX와 DX를 고려하여 기획 내용을 구현하는 것을 중요하게 생각합니다.
      </p>
    </div>
  );
}

// 포트폴리오 콘텐츠 컴포넌트
function PortfolioContent() {
  // 현재 로케일 가져오기
  const params = useParams();
  const locale = params.locale as string;

  // contentlayer에서 프로젝트 섹션의 MDX 파일들을 가져옵니다
  const projectItems = useMemo(() => {
    return allAbouts
      .filter((about) => about.section === 'projects')
      .sort((a, b) => (a.order || 999) - (b.order || 999))
      .map((project, index) => {
        // 기본 기술 스택 - 메타데이터에 정의되지 않은 경우 사용
        const defaultTechStack = ['Next.js', 'React', 'TypeScript'];

        // 프로젝트 링크 생성 (로케일 경로 포함)
        const projectLink = `/${locale}/about/projects/${project.slug.split('/').pop()}`;

        // 썸네일 이미지 경로 생성
        const thumbnail = project.thumbnail || `/projects/${project.slug.split('/').pop()}.png`;

        return {
          id: index + 1,
          title: project.title,
          description: project.description || '프로젝트 설명이 준비 중입니다.',
          techStack: (project.techStack || defaultTechStack) as string[],
          link: projectLink,
          thumbnail: thumbnail,
        };
      });
  }, [locale]);

  return (
    <div className="prose prose-lg w-full dark:prose-invert">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {projectItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md dark:border-gray-800"
          >
            {/* 썸네일 이미지 영역 */}
            <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover"
                unoptimized
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/projects/project-default.png';
                  target.onerror = null; // 무한 루프 방지
                }}
              />
            </div>

            {/* 프로젝트 정보 영역 */}
            <div className="relative flex flex-1 flex-col bg-white p-4 dark:bg-gray-900">
              {/* 프로젝트 제목 및 설명 */}
              <h3 className="mt-0 text-lg font-medium">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>

              {/* 프로젝트 링크 */}
              <Link
                href={item.link.startsWith('http') ? item.link : item.link}
                target={item.link.startsWith('http') ? '_blank' : undefined}
                className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                프로젝트 보기 <span className="ml-1">→</span>
              </Link>

              {/* 기술 스택 태그 */}
              <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                {item.techStack.map((tech) => (
                  <span key={tech} className="rounded-md bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const profileInfo = {
    title: '손영산',
    description: '프론트엔드 개발자',
  };

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-col gap-y-3 space-y-8 print:space-y-4">
      {/* 프로필 헤더 섹션 */}
      <section className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-2xl font-bold text-black dark:text-gray-100">{profileInfo.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-100">{profileInfo.description}</p>
          <div className="flex gap-2">
            <Link
              href="https://github.com/zeromountain"
              target="_blank"
              className="rounded-md border border-gray-100 p-2 transition-colors hover:bg-gray-100"
            >
              <GithubIcon />
            </Link>
            <Link
              href="https://www.linkedin.com/in/yeongsan-son-b289551b0/"
              target="_blank"
              className="rounded-md border border-gray-100 p-2 transition-colors hover:bg-gray-100"
            >
              <LinkedinIcon />
            </Link>
            <button className="rounded-md border border-gray-100 p-2 transition-colors hover:bg-gray-100">
              <EmailIcon />
            </button>
          </div>
        </div>
        <div className="relative flex size-28 shrink-0 overflow-hidden rounded-xl">
          <Image src="/profile.jpeg" alt="profile" width={100} height={100} className="aspect-square h-full w-full" />
        </div>
      </section>

      {/* 프로필 소개 섹션 */}
      <AboutSection title="ABOUT">
        <ProfileContent />
      </AboutSection>

      {/* 포트폴리오 섹션 */}
      <AboutSection title="PORTFOLIO">
        <PortfolioContent />
      </AboutSection>

      {/* 임시 메시지: 개발 중 */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-900/20">
        <h3 className="mb-2 font-medium">개발 중입니다</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          마크다운 콘텐츠를 기반으로 한 포트폴리오 페이지로 현재 개발 중입니다. 곧 모든 섹션이 완성될 예정입니다.
        </p>
      </div>
    </div>
  );
}
