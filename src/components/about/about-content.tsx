import { About } from '@/types/contentlayer';

interface AboutContentProps {
  content: About;
  className?: string;
}

export function AboutContent({ className }: AboutContentProps) {
  return (
    <div className={`prose prose-lg dark:prose-invert ${className || ''}`}>
      {/* <MDXContent code={content.body.code} /> */}
    </div>
  );
}
