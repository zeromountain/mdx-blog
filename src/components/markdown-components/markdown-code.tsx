import copy from 'copy-to-clipboard';
import { Check, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useState } from 'react';

export const MarkdownCode = ({ children, language, ...props }: SyntaxHighlighterProps) => {
  const [copied, setCopied] = useState(false);

  const codeString = typeof children === 'string' ? children : String(children);

  const handleCopy = () => {
    copy(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <div className="absolute right-2 top-2 z-10">
        <button
          onClick={handleCopy}
          className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800/60 text-gray-200 backdrop-blur transition-colors hover:bg-gray-700/70"
          aria-label="복사하기"
        >
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <SyntaxHighlighter
        {...props}
        language={language}
        style={darcula}
        wrapLongLines
        wrapLines
        showLineNumbers
        customStyle={{
          backgroundColor: 'transparent',
          padding: '0',
          margin: '0',
          borderRadius: '8px',
          border: 'none',
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '20px',
          textAlign: 'left',
        }}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};
