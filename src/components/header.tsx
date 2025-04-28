'use client';

import { gsap } from 'gsap';
import { Menu } from 'lucide-react';

import Link from 'next/link';

import { useEffect, useRef } from 'react';

import { Button } from '@nextui-org/button';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 헤더 애니메이션
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      delay: 0.5,
      ease: 'power3.out',
    });

    // 스크롤 이벤트에 따른 헤더 스타일 변경
    const handleScroll = () => {
      if (window.scrollY > 50) {
        headerRef.current?.classList.add('bg-black/80', 'backdrop-blur-md');
        headerRef.current?.classList.remove('bg-transparent');
      } else {
        headerRef.current?.classList.remove('bg-black/80', 'backdrop-blur-md');
        headerRef.current?.classList.add('bg-transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={headerRef} className="fixed left-0 top-0 z-40 w-full bg-transparent transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-green-500">
          DEV<span className="text-white">⚽FUTSAL</span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden items-center space-x-8 md:flex">
          <Link href="#about" className="text-white transition-colors hover:text-green-500">
            About
          </Link>
          <Link href="#projects" className="text-white transition-colors hover:text-green-500">
            Projects
          </Link>
          <Link href="#contact" className="text-white transition-colors hover:text-green-500">
            Contact
          </Link>
          <Button className="bg-green-500 text-white hover:bg-green-600">Resume</Button>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <Button variant="ghost" size="lg" className="text-white hover:bg-green-500/20 md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
