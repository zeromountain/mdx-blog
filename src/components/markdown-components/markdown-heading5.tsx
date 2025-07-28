import { extractTextFromChildren, generateHeadingId } from '@/utils/heading-id';

export default function MarkdownHeading5({ children }: { children: React.ReactNode }) {
  const text = extractTextFromChildren(children);
  const id = generateHeadingId(text);
  
  return <h5 id={id} className="my-4 text-lg font-bold">{children}</h5>;
}
