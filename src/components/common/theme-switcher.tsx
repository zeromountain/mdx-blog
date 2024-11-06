'use client';

import { useTheme } from 'next-themes';

import { useEffect, useState } from 'react';

import MoonIcon from '@/assets/icon/moon-icon';
import SunIcon from '@/assets/icon/sun-icon';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      {theme === 'light' ? (
        <MoonIcon onClick={() => setTheme('dark')} className="cursor-pointer hover:scale-110" />
      ) : (
        <SunIcon onClick={() => setTheme('light')} className="cursor-pointer hover:scale-110" />
      )}
    </>
  );
}
