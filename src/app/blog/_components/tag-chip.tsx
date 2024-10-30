'use client';

import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

type TagChipProps = {
  id: string;
  name: string;
  color: string;
  notSelected?: boolean;
  onClick?: (id: string) => void;
};

export default function TagChip({ id, name, color, notSelected, onClick }: TagChipProps) {
  const { theme } = useTheme();

  const defaultText = theme === 'dark' ? 'white' : 'black';

  const convertedBg = color === 'default' ? 'gray' : color === 'brown' ? 'red' : color;

  const dynamicTextColor = notSelected ? `text-${defaultText}` : 'text-black';

  const handleTagClick = () => {
    onClick?.(id);
  };

  return (
    <div
      className={cn(dynamicTextColor, `text-12 rounded-4 clickable bg-${convertedBg}-500 px-12 py-4 text-white`)}
      onClick={handleTagClick}
    >
      {name}
    </div>
  );
}
