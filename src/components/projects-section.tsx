'use client';

import { gsap } from 'gsap';
import { ExternalLink } from 'lucide-react';

import { useEffect, useRef } from 'react';

import { Button } from '@nextui-org/button';

import ProjectCard from './project-card';

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 스크롤 트리거 애니메이션
    if (sectionRef.current && projectsRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
      }).from(
        projectsRef.current.children,
        {
          y: 50,
          opacity: 0,
          stagger: 0.2,
          duration: 0.6,
        },
        '-=0.3',
      );
    }
  }, []);

  const projects = [
    {
      id: 1,
      title: '풋살 매치 파인더',
      description: '풋살 경기를 쉽게 찾고 예약할 수 있는 웹 애플리케이션. 실시간 매치 정보와 팀 관리 기능 제공.',
      image: '/placeholder.svg?height=400&width=600',
      tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      demoLink: 'https://example.com',
      githubLink: 'https://github.com',
    },
    {
      id: 2,
      title: '인터랙티브 포트폴리오',
      description: 'GSAP와 Three.js를 활용한 인터랙티브 포트폴리오 웹사이트. 사용자 경험을 극대화한 애니메이션 구현.',
      image: '/placeholder.svg?height=400&width=600',
      tags: ['React', 'GSAP', 'Three.js', 'Tailwind CSS'],
      demoLink: 'https://example.com',
      githubLink: 'https://github.com',
    },
    {
      id: 3,
      title: '스포츠 데이터 대시보드',
      description: '다양한 스포츠 경기 데이터를 시각화하는 대시보드. 실시간 업데이트와 커스텀 필터링 기능 제공.',
      image: '/placeholder.svg?height=400&width=600',
      tags: ['Next.js', 'D3.js', 'Firebase', 'Tailwind CSS'],
      demoLink: 'https://example.com',
      githubLink: 'https://github.com',
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="bg-gradient-to-b from-[#111] to-[#0a0a0a] py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="mb-16 text-center text-3xl font-bold md:text-5xl">
          주요 <span className="text-green-500">프로젝트</span>
        </h2>

        <div ref={projectsRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-green-500 px-8 text-white hover:bg-green-600">
            더 많은 프로젝트 보기
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
