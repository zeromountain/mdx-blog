import Link from 'next/link';

import { Navbar, NavbarContent, NavbarItem } from '@nextui-org/navbar';

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
  return (
    <Navbar as="nav">
      <NavbarContent>
        {links.map((link) => (
          <NavbarItem key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
