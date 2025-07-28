import { MarkdownCode } from './markdown-code';
import MarkdownHeading1 from './markdown-heading1';
import MarkdownHeading2 from './markdown-heading2';
import MarkdownHeading3 from './markdown-heading3';
import MarkdownHeading4 from './markdown-heading4';
import MarkdownHeading5 from './markdown-heading5';
import MarkdownHeading6 from './markdown-heading6';
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
  h2: MarkdownHeading2,
  h3: MarkdownHeading3,
  h4: MarkdownHeading4,
  h5: MarkdownHeading5,
  h6: MarkdownHeading6,
};
