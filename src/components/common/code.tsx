import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css';

import React from 'react';

export default function Code({ children, language }: { children: string; language: string }) {
  return (
    <>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              children,
              Prism.languages[language.toLowerCase()] || 'javascript',
              language.toLowerCase() || 'javascript',
            ),
          }}
        />
      </pre>

      <style jsx>
        {`
          pre {
            tab-size: 2;
          }

          code {
            overflow: auto;
            display: block;
            padding: 0.8rem;
            line-height: 1.5;
            background-color: #f5f5f5;
            font-size: 0.8rem;
            border-radius: 0.5rem;
          }
        `}
      </style>
    </>
  );
}
