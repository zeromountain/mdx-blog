import { extractTextFromChildren, generateHeadingId } from '@/utils/heading-id';

export default function MarkdownHeading3({ children }: { children: React.ReactNode }) {
  const text = extractTextFromChildren(children);
  const id = generateHeadingId(text);
  
  return <h3 id={id} className="my-4 text-2xl font-bold">{children}</h3>;
}
