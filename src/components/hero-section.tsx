'use client';

import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

import { useEffect, useRef } from 'react';

import { Button } from '@nextui-org/button';

import SoccerField from './soccer-field';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const instructionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
      .from(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4',
      )
      .from(
        ctaRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4',
      )
      .from(
        socialsRef.current,
        {
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4',
      )
      .from(
        instructionRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.2',
      );
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* 배경 축구장 */}
      <SoccerField />

      {/* 소셜 미디어 링크 */}
      <div ref={socialsRef} className="absolute bottom-1/4 left-6 flex flex-col gap-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors hover:text-green-500"
        >
          <Github className="h-6 w-6" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors hover:text-green-500"
        >
          <Linkedin className="h-6 w-6" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors hover:text-green-500"
        >
          <Twitter className="h-6 w-6" />
        </a>
        <div className="mx-auto h-24 w-px bg-white/30" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 ref={titleRef} className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl">
            <span className="text-green-500">프론트엔드</span> 개발자 & <span className="text-green-500">풋살</span>{' '}
            플레이어
          </h1>
          <p ref={subtitleRef} className="mb-8 text-xl text-gray-300 md:text-2xl">
            코드로 골을 넣고, 필드에서 승리하는 개발자입니다.
            <br />
            창의적인 웹 경험과 인터랙티브한 UI를 만듭니다.
          </p>
          <div ref={ctaRef} className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-green-500 px-8 text-lg text-white hover:bg-green-600">
              프로젝트 보기
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="border-green-500 px-8 text-lg text-green-500 hover:bg-green-500/10"
            >
              연락하기
            </Button>
          </div>
        </div>
      </div>

      {/* 인터랙션 안내 */}
      <div ref={instructionRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 transform text-center">
        <p className="mb-2 text-sm text-white/50">인터랙션 사용법:</p>
        <p className="mb-4 text-xs text-white/50">마우스 드래그: 공 궤적 그리기 | ESC: 스코어보드 토글</p>
        <ArrowDown className="mx-auto h-6 w-6 animate-bounce text-white/70" />
      </div>
    </section>
  );
}
