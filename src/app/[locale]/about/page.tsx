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
      <h2>소개</h2>
      <p>
        다양한 직군의 팀원들과 협업하며 다양한 경험을 쌓았습니다.
        <br />
        성장을 취우선 가치로 여기며 효율적인 업무 문화를 만들어가는 것을 중요하게 생각합니다.
        <br />
        UI/UX와 DX를 고려하여 기획 내용을 구현하는 것을 중요하게 생각합니다.
      </p>
      <h2>연락처</h2>
      <ul>
        <li>
          GitHub:{' '}
          <a href="https://github.com/zeromountain" target="_blank" rel="noopener noreferrer">
            github.com/zeromountain
          </a>
        </li>
        <li>
          LinkedIn:{' '}
          <a href="https://www.linkedin.com/in/yeongsan-son-b289551b0/" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/yeongsan-son-b289551b0/
          </a>
        </li>
        <li>Email: yeongsan.mountain@gmail.com</li>
      </ul>
    </div>
  );
}

// 포트폴리오 콘텐츠 컴포넌트
function PortfolioContent() {
  const portfolioItems = [
    {
      id: 1,
      title: '노션 블로그',
      description: 'Next.js와 노션 API를 활용한 개인 블로그 프로젝트',
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Notion API'],
      link: 'https://github.com/zeromountain/notion-blog',
      thumbnail: '/projects/notion-blog.png',
    },
    {
      id: 2,
      title: '웹 포트폴리오',
      description: '개인 포트폴리오 웹사이트',
      techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      link: 'https://github.com/zeromountain/portfolio',
      thumbnail: '/projects/portfolio.png',
    },
    {
      id: 3,
      title: '개인 프로젝트',
      description: '진행 중인 사이드 프로젝트',
      techStack: ['React', 'TypeScript', 'Styled Components'],
      link: '#',
      thumbnail: '/projects/project-default.png',
    },
  ];

  return (
    <div className="prose prose-lg w-full dark:prose-invert">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-md dark:border-gray-800"
          >
            <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
              <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="mt-0 text-lg font-medium">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.techStack.map((tech) => (
                  <span key={tech} className="rounded-md bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-3">
                <Link
                  href={item.link}
                  target="_blank"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  프로젝트 보기 →
                </Link>
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
          <h2 className="text-2xl font-bold">{profileInfo.title}</h2>
          <p className="text-sm text-gray-500">{profileInfo.description}</p>
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
          MDX 콘텐츠를 기반으로 한 포트폴리오 페이지로 현재 개발 중입니다. 곧 모든 섹션이 완성될 예정입니다.
        </p>
      </div>
    </div>
  );
}
