'use client';

import { cn } from '@/lib/utils';

type TagChipProps = {
  id: string;
  name: string;
  color: string;
  onClick?: (id: string) => void;
};

export default function TagChip({ id, name, color, onClick }: TagChipProps) {
  const handleTagClick = () => {
    onClick?.(id);
  };

  return (
    <div
      className={cn(`text-12 rounded-4 clickable p-2 text-white`)}
      style={{
        backgroundColor: color,
      }}
      onClick={handleTagClick}
    >
      {name}
    </div>
  );
}
