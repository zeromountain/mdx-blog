import { ReactNode } from 'react';

import { About } from '@/types/contentlayer';

interface AboutSectionProps {
  title: string;
  children: ReactNode;
}

export function AboutSection({ title, children }: AboutSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

interface AboutCardProps {
  content: About;
}

export function AboutCard({ content }: AboutCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 transition-all hover:border-primary-200 hover:bg-primary-50/30 dark:border-gray-800 dark:hover:border-primary-900 dark:hover:bg-primary-900/10">
      <h4 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">{content.title}</h4>
      {content.description && <p className="text-sm text-gray-600 dark:text-gray-400">{content.description}</p>}
    </div>
  );
}
