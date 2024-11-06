import { ThemeProvider } from 'next-themes';

import { PropsWithChildren } from 'react';

import { NextUIProvider } from '@nextui-org/react';

export function WithNextUIProvider({ children }: PropsWithChildren) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
