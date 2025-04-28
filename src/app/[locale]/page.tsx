'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useEffect, useState } from 'react';

import AboutSection from '@/components/about-section';
import BallTrajectory from '@/components/ball-trajectory';
import BouncingBall from '@/components/bouncing-ball';
import ContactSection from '@/components/contact-section';
import FieldBackground from '@/components/field-background';
import GoalAnimation from '@/components/goal-animation';
import HeroSection from '@/components/hero-section';
import PlayerSilhouettes from '@/components/player-silhouettes';
import ProjectsSection from '@/components/projects-section';
import Scoreboard from '@/components/soccerboard';
import SoccerBallCursor from '@/components/soccoer-ball-cursor';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadingTimeline = gsap.timeline();

    loadingTimeline.from('.content', { opacity: 0, duration: 0.5 });

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">
      {/* 배경 요소들 */}
      <div className="fixed inset-0 z-0">
        <FieldBackground />
        <PlayerSilhouettes />
        <BouncingBall />
        <BallTrajectory />
        <GoalAnimation />
        <Scoreboard />
      </div>

      {/* 커스텀 축구공 커서 */}
      {/* <SoccerBallCursor position={cursorPosition} /> */}

      {/* 메인 콘텐츠 */}
      <div className="content relative z-10 min-h-screen w-full overflow-y-auto">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  );
}
