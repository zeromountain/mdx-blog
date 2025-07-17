import { MarkdownCode } from './markdown-code';
import { MarkdownImage } from './markdown-image';
import { MarkdownList } from './markdown-list';
import { MarkdownParagraph } from './markdown-paragraph';
import { MarkdownUnorderedList } from './markdown-unordered-list';

export const MarkdownComponents = {
  code: (props: any) => {
    const { inline, className, children, ...rest } = props;
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
};
