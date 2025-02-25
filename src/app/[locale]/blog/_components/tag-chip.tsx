'use client';

import { cn } from '@/lib/utils';

type TagChipProps = {
  name: string;
  color: keyof typeof TAG_COLORS;
};

const TAG_COLORS = {
  default: '#000000',
  red: '#E74C4C',
  orange: '#FF8C42',
  yellow: '#FFB900',
  green: '#4CAF50',
  blue: '#4A90E2',
  purple: '#9C27B0',
  pink: '#E91E63',
  brown: '#8B7355',
  gray: '#808080',
  black: '#000000',
  white: '#FFFFFF',
};

export default function TagChip({ name, color }: TagChipProps) {
  return (
    <div
      className={cn(`text-12 clickable rounded-lg p-2 text-white`)}
      style={{
        backgroundColor: TAG_COLORS[color],
      }}
    >
      {name}
    </div>
  );
}
