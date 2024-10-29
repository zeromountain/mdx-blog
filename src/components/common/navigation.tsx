'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar';

import { cn } from '@/lib/utils';

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

export default function Navigation() {
  const pathname = usePathname();

  return (
    <Navbar isBlurred isBordered>
      <NavbarContent>
        {links.map((link) => (
          <NavbarItem key={link.href}>
            <Link
              href={link.href}
              className={cn(
                'rounded-md px-3 py-1 transition-colors',
                pathname === link.href || pathname.startsWith(`${link.href}/`)
                  ? 'bg-primary font-bold text-primary-foreground'
                  : 'hover:bg-primary/10',
              )}
            >
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
