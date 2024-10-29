'use client';

import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-tomorrow.css';

export default function BlogContent({ html, language }: { html: string; language: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: Prism.highlight(html, Prism.languages[language], language) }}
      className="prose prose-indigo w-full max-w-screen-md overflow-hidden scrollbar-hide"
    />
  );
}
