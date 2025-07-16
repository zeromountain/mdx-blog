'use client';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';

import { PropsWithChildren, useEffect, useState } from 'react';

export function WithHeroUIProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <HeroUIProvider>{children}</HeroUIProvider>;
  }

  return (
    <HeroUIProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  );
}
