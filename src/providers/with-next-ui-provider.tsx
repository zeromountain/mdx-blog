'use client';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';

import { PropsWithChildren } from 'react';

export function WithHeroUIProvider({ children }: PropsWithChildren) {
  return (
    <HeroUIProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  );
}
