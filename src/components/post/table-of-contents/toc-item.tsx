import { Link } from '@/app/i18n/routing';
import type { TocItem } from '@/utils/toc';

interface TocItemProps {
  item: TocItem;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export default function TocListItem({ item, isActive, onClick }: TocItemProps) {
  const { id, text, level } = item;

  return (
    <li className="list-none" style={{ paddingLeft: `${(level - 1) * 16}px` }}>
      <Link
        href={`#${id}`}
        onClick={(e) => onClick(e, id)}
        className={`block w-full text-left transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
          isActive ? 'font-medium text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
        }`}
      >
        {text}
      </Link>
    </li>
  );
}
