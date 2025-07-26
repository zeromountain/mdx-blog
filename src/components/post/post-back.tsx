import { ArrowLeft } from 'lucide-react';

import { Link } from '@/app/i18n/routing';

export default function PostBack() {
  return (
    <div className="mb-8 mt-6">
      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        목록으로 돌아가기
      </Link>
    </div>
  );
}
