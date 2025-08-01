import type { TocItem } from '@/utils/toc';

import TocListItem from './toc-item';

interface TocNavProps {
  headings: TocItem[];
  activeId: string;
  onItemClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export default function TocNav({ headings, activeId, onItemClick }: TocNavProps) {
  return (
    <nav className="w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">목차</h2>
      <div
        className="max-h-[calc(100vh-300px)] overflow-y-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgb(209 213 219) transparent',
        }}
      >
        <ul className="space-y-2 text-sm">
          {headings.map((item) => (
            <TocListItem key={item.id} item={item} isActive={activeId === item.id} onClick={onItemClick} />
          ))}
        </ul>
      </div>
    </nav>
  );
}
