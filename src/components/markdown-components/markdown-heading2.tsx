import { extractTextFromChildren, generateHeadingId } from '@/utils/heading-id';

export default function MarkdownHeading2({ children }: { children: React.ReactNode }) {
  const text = extractTextFromChildren(children);
  const id = generateHeadingId(text);
  
  return <h2 id={id} className="my-4 text-3xl font-bold">{children}</h2>;
}
