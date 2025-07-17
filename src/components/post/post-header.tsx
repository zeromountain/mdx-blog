import { Chip } from '@heroui/chip';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

interface IPostHeaderProps {
  title: string;
  tags: string[];
  date: string;
  readingTime: string;
}

export default function PostHeader({ title, tags, date, readingTime }: IPostHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold text-black dark:text-gray-100">{title}</h1>

      <div className="my-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Chip
            key={tag}
            className="bg-primary-50 text-sm text-primary-500 dark:bg-primary-900/30 dark:text-primary-400"
          >
            {tag}
          </Chip>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm text-gray-500 dark:text-gray-100">{format(new Date(date), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm text-gray-500 dark:text-gray-100">{readingTime} min</span>
        </div>
      </div>
      <hr className="my-4" />
    </header>
  );
}
