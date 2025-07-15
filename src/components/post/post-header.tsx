import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

import { Link } from '@/app/i18n/routing';

interface IPostHeaderProps {
  title: string;
  categoryPath?: string;
  date: string;
  readingTime: string;
}

export default function PostHeader({ title, categoryPath, date, readingTime }: IPostHeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
      <div>
        {categoryPath && (
          <Link href={`/blog/${categoryPath}`} className="">
            {categoryPath}
          </Link>
        )}
      </div>
      <div>
        <div>
          <Calendar />
          <span>{format(new Date(date), 'MMM d, yyyy')}</span>
        </div>
        <div>
          <Clock />
          <span>{readingTime}</span>
        </div>
      </div>
      <hr className="my-4" />
    </header>
  );
}
