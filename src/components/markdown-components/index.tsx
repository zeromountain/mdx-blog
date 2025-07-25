import { MarkdownCode } from './markdown-code';
import MarkdownHeading1 from './markdown-heading1';
import { MarkdownImage } from './markdown-image';
import { MarkdownList } from './markdown-list';
import { MarkdownParagraph } from './markdown-paragraph';
import { MarkdownUnorderedList } from './markdown-unordered-list';

export const MarkdownComponents = {
  code: (props: any) => {
    const { className, children } = props;
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <MarkdownCode {...props} language={match?.[1]}>
        {String(children).replace(/\n$/, '')}
      </MarkdownCode>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  img: MarkdownImage,
  ul: MarkdownUnorderedList,
  li: MarkdownList,
  p: MarkdownParagraph,
  h1: MarkdownHeading1,
};
