'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar';

import { cn } from '@/lib/utils';

const links = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'About',
    href: '/about',
  },
] as const;

export default function Navigation() {
  const pathname = usePathname();

  return (
    <Navbar>
      <NavbarContent>
        {links.map((link) => (
          <NavbarItem key={link.href}>
            <Link href={link.href} className={cn(pathname === link.href && 'font-bold')}>
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
