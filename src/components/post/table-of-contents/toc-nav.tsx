import TocListItem from './toc-item';
import type { TocItem } from '@/utils/toc';

interface TocNavProps {
  headings: TocItem[];
  activeId: string;
  onItemClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export default function TocNav({ headings, activeId, onItemClick }: TocNavProps) {
  return (
    <nav className="w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
        목차
      </h2>
      <ul className="max-h-[calc(100vh-200px)] space-y-2 overflow-y-auto text-sm">
        {headings.map((item) => (
          <TocListItem
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            onClick={onItemClick}
          />
        ))}
      </ul>
    </nav>
  );
}