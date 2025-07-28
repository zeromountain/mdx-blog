import { extractTextFromChildren, generateHeadingId } from '@/utils/heading-id';

export default function MarkdownHeading4({ children }: { children: React.ReactNode }) {
  const text = extractTextFromChildren(children);
  const id = generateHeadingId(text);
  
  return <h4 id={id} className="my-4 text-xl font-bold">{children}</h4>;
}
