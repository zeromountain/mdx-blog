'use client';

import { Navbar, NavbarContent, NavbarItem } from '@heroui/navbar';

import { useParams, usePathname } from 'next/navigation';

import { Link } from '@/app/i18n/routing';
import { cn } from '@/lib/utils';

import LanguageSwitcher from './language-switcher';
import ThemeSwitcher from './theme-switcher';

const links = [
  {
    label: 'Home',
    href: '/',
    path: '',
  },
  {
    label: 'Blog',
    href: '/blog',
    path: 'blog',
  },
  {
    label: 'About',
    href: '/about',
    path: 'about',
  },
] as const;

type Locale = 'ko' | 'en';

export default function Navigation() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as Locale;

  // 현재 경로가 해당 링크의 경로와 일치하는지 확인하는 함수
  const isActive = (href: string) => {
    // 홈 페이지(/)인 경우
    if (href === '/' && pathname === `/${locale}`) return true;

    // 정확히 일치하는 경우 (예: /blog === /blog)
    if (pathname === `/${locale}${href}`) return true;

    // 하위 경로인 경우 (예: /blog/post-1은 /blog의 하위 경로)
    if (href !== '/' && pathname.startsWith(`/${locale}${href}/`)) return true;

    return false;
  };

  return (
    <Navbar isBlurred isBordered className="z-100">
      <NavbarContent>
        {links.map((link) => (
          <NavbarItem key={link.href}>
            <Link
              href={link.href}
              className={cn(
                'rounded-md px-3 py-1 transition-colors',
                isActive(link.href) ? 'bg-primary font-bold text-primary-foreground' : 'hover:bg-primary/10',
              )}
            >
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <LanguageSwitcher />
      <ThemeSwitcher />
    </Navbar>
  );
}
