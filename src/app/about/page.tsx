import Image from 'next/image';
import Link from 'next/link';

import AwsIcon from '@/assets/icon/aws-icon';
import ChakrauiIcon from '@/assets/icon/chakraui-icon';
import DockerIcon from '@/assets/icon/docker-icon';
import EmailIcon from '@/assets/icon/email-icon';
import FigmaIcon from '@/assets/icon/figma-icon';
import GitIcon from '@/assets/icon/git-icon';
import GithubIcon from '@/assets/icon/github-icon';
import JiraIcon from '@/assets/icon/jira-icon';
import LinkedinIcon from '@/assets/icon/linkedin-icon';
import MuiIcon from '@/assets/icon/mui-icon';
import NextjsIcon from '@/assets/icon/nextjs-icon';
import ReactIcon from '@/assets/icon/react-icon';
import ReactNativeIcon from '@/assets/icon/reactnative-icon';
import ReactQueryIcon from '@/assets/icon/reactquery-icon';
import SlackIcon from '@/assets/icon/slack-icon';
import TailwindIcon from '@/assets/icon/tailwind-icon';
import TsIcon from '@/assets/icon/ts-icon';
import { PROJECTS } from '@/constants/project';

import ProjectItem from './_components/project-item';
import SkillItem from './_components/skill-item';
import WorkingHistoryItem from './_components/working-history-item';

const SKILLS = {
  languages: [
    {
      name: 'TypeScript',
      icon: <TsIcon fontSize={32} />,
    },
  ],
  frontend: [
    {
      name: 'React',
      icon: <ReactIcon fontSize={32} />,
    },
    {
      name: 'React Native',
      icon: <ReactNativeIcon fontSize={32} />,
    },
    {
      name: 'Next.js',
      icon: <NextjsIcon fontSize={32} />,
    },
    {
      name: 'MUI',
      icon: <MuiIcon fontSize={32} />,
    },
    {
      name: 'Tailwind CSS',
      icon: <TailwindIcon fontSize={32} />,
    },
    {
      name: 'Chakra UI',
      icon: <ChakrauiIcon fontSize={32} />,
    },
    {
      name: 'Tanstack Query',
      icon: <ReactQueryIcon fontSize={32} />,
    },
  ],
  infra: [
    {
      name: 'Docker',
      icon: <DockerIcon fontSize={32} />,
    },
    {
      name: 'AWS',
      icon: <AwsIcon fontSize={32} />,
    },
  ],
  tools: [
    {
      name: 'Git',
      icon: <GitIcon fontSize={32} />,
    },
    {
      name: 'Jira',
      icon: <JiraIcon fontSize={32} />,
    },
    {
      name: 'Figma',
      icon: <FigmaIcon fontSize={32} />,
    },
    {
      name: 'Slack',
      icon: <SlackIcon fontSize={32} />,
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-col gap-y-3 space-y-8 print:space-y-4">
      <section className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-2xl font-bold">손영산</h2>
          <p className="text-sm text-gray-500">FE DEVELOPER</p>
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
      <section className="space-y-2">
        <h3 className="text-lg font-bold">ABOUT</h3>
        {/* 불릿리스트 */}
        <ul className="list-disc space-y-2 px-4">
          <li className="text-sm">다양한 직군의 팀원들과 협업하며 다양한 경험을 쌓았습니다.</li>
          <li className="text-sm">
            성장을 취우선 가치로 여기며 효율적인 업무 문화를 만들어가는 것을 중요하게 생각합니다.
          </li>
          <li className="text-sm">UI/UX와 DX를 고려하여 기획 내용을 구현하는 것을 중요하게 생각합니다.</li>
        </ul>
      </section>
      <section>
        <h3 className="text-lg font-bold">SKILLS</h3>
        <div className="flex flex-col justify-center gap-2">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <div key={category} className="flex flex-wrap items-center gap-2">
              <p className="min-w-[80px] text-sm font-bold">{category}</p>
              {skills.map((skill) => (
                <SkillItem key={skill.name} name={skill.name} icon={skill.icon} />
              ))}
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-2 text-lg font-bold">WORK EXPERIENCE</h3>
        <div className="flex flex-col gap-4">
          <WorkingHistoryItem
            company="너디스타"
            period="2023.10 ~ 현재"
            job="프론트엔드"
            projects={[]}
            description={`P2E 게임 데스페라도의 주요 서비스인 LUXON 웹 유지보수 및 개발을 담당하며 게이머에게 웹 페이지를 통해 게임 재화 및 캐릭터를 NFT로 관리할 수 있는 환경을 제공하였습니다.\n이외에 사내 프로젝트 개발 및 유지보수를 리딩하며 프로젝트의 효율성을 높이는 작업을 진행하였습니다.`}
          />
          <WorkingHistoryItem
            company="똑똑한개발자"
            period="2022.05 ~ 2023.08"
            job="프론트엔드"
            projects={[]}
            description={`React와 Next.js를 사용하여 웹 애플리케이션을 개발하였고, React Native를 사용해 모바일 앱을 개발하였습니다.\n팀원들과 코드 리뷰를 통해 코드 품질 향상을 고민하고 기술적인 경험과 지식을 공유하는 경험을 했습니다.`}
          />
        </div>
      </section>
      <section className="space-y-2">
        <h3 className="text-lg font-bold">PROJECTS</h3>
        {/* 프로젝트 리스트 */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            {
              id: 1,
              name: 'luxon',
              description: PROJECTS.luxon.description,
            },
            {
              id: 2,
              name: '프로젝트 2',
              description: '프로젝트 2 설명',
            },
            {
              id: 3,
              name: '프로젝트 3',
              description: '프로젝트 3 설명',
            },
            {
              id: 4,
              name: '프로젝트 4',
              description: '프로젝트 4 설명',
            },
            {
              id: 5,
              name: '프로젝트 5',
              description: '프로젝트 5 설명',
            },
            {
              id: 6,
              name: '프로젝트 6',
              description: '프로젝트 6 설명',
            },
          ].map((project) => (
            <ProjectItem key={project.id} name={project.name} description={project.description} />
          ))}
        </div>
      </section>
    </div>
  );
}
