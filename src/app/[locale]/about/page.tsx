'use client';

import Image from 'next/image';
import Link from 'next/link';

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
