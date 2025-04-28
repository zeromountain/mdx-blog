'use client';

import { gsap } from 'gsap';
import { Code, Dribbble, Zap } from 'lucide-react';

import Image from 'next/image';

import { useEffect, useRef } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 스크롤 트리거 애니메이션
    if (sectionRef.current) {
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
      })
        .from(
          contentRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.3',
        )
        .from(
          skillsRef.current?.children || [],
          {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4,
          },
          '-=0.3',
        );
    }
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-gradient-to-b from-[#0a0a0a] to-[#111] py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="mb-16 text-center text-3xl font-bold md:text-5xl">
          코드와 <span className="text-green-500">풋살</span>의 조화
        </h2>

        <div ref={contentRef} className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-lg text-gray-300">
              안녕하세요! 저는 <span className="font-semibold text-green-500">3년 차 프론트엔드 개발자</span>로, 사용자
              경험을 향상시키는 인터랙티브한 웹 애플리케이션을 만드는 것을 좋아합니다.
            </p>
            <p className="text-lg text-gray-300">
              React, TypeScript, 그리고 최신 웹 기술을 활용하여 아름답고 효율적인 UI를 구현합니다. 특히 애니메이션과
              인터랙션에 관심이 많습니다.
            </p>
            <p className="text-lg text-gray-300">
              개발 외에도 <span className="font-semibold text-green-500">풋살을 즐기는 열정적인 플레이어</span>입니다.
              필드에서 팀워크와 전략을 배우며, 이러한 경험이 협업과 문제 해결 능력을 향상시키는 데 도움이 됩니다.
            </p>
          </div>

          <div className="relative mx-auto">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-green-500 md:h-80 md:w-80">
              <Image
                src="/placeholder.svg?height=320&width=320"
                alt="프로필 이미지"
                width={320}
                height={320}
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-full bg-green-500 px-4 py-2 font-bold text-black">
              풋살 ⚽ 코딩
            </div>
          </div>
        </div>

        <div ref={skillsRef} className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-green-500/20 bg-black/30 p-8 transition-all duration-300 hover:border-green-500/50">
            <Code className="mb-4 h-12 w-12 text-green-500" />
            <h3 className="mb-4 text-xl font-bold">프론트엔드 개발</h3>
            <p className="mb-6 text-gray-300">React, TypeScript, Next.js를 활용한 모던 웹 애플리케이션 개발</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-500">React</span>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-500">TypeScript</span>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-500">Next.js</span>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-500">Tailwind</span>
            </div>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-black/30 p-8 transition-all duration-300 hover:border-green-500/50">
            <Zap className="mb-4 h-12 w-12 text-green-500" />
            <h3 className="mb-4 text-xl font-bold">애니메이션 & 인터랙션</h3>
            <p className="mb-6 text-gray-300">GSAP, Framer Motion을 활용한 부드럽고 인상적인 UI 애니메이션</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-500">GSAP</span>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-500">Framer Motion</span>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-500">CSS Animations</span>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-500">Three.js</span>
            </div>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-black/30 p-8 transition-all duration-300 hover:border-green-500/50">
            <Dribbble className="mb-4 h-12 w-12 text-green-500" />
            <h3 className="mb-4 text-xl font-bold">풋살 & 팀워크</h3>
            <p className="mb-6 text-gray-300">필드에서의 팀워크와 전략적 사고를 개발 프로세스에 적용</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-500">팀워크</span>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-500">문제해결</span>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-500">전략적 사고</span>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-500">적응력</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
