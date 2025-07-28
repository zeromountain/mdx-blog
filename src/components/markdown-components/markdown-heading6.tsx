import { extractTextFromChildren, generateHeadingId } from '@/utils/heading-id';

export default function MarkdownHeading6({ children }: { children: React.ReactNode }) {
  const text = extractTextFromChildren(children);
  const id = generateHeadingId(text);
  
  return <h6 id={id} className="my-4 text-base font-bold">{children}</h6>;
}
