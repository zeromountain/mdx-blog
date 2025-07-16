import { MarkdownCode } from './markdown-code';
import { MarkdownImage } from './markdown-image';

export const MarkdownComponents = {
  code: ({
    inline,
    className,
    children,
    ...props
  }: {
    inline: boolean;
    className: string;
    children: React.ReactNode;
  }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline ? (
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
};
