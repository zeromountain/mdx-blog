import * as React from 'react';

function JiraIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M11.53 2c0 2.4 1.97 4.35 4.35 4.35h1.78v1.7c0 2.4 1.94 4.34 4.34 4.35V2.84a.84.84 0 00-.84-.84h-9.63M6.77 6.8a4.362 4.362 0 004.34 4.34h1.8v1.72a4.362 4.362 0 004.34 4.34V7.63a.841.841 0 00-.83-.83H6.77M2 11.6c0 2.4 1.95 4.34 4.35 4.34h1.78v1.72c.01 2.39 1.95 4.34 4.34 4.34v-9.57a.84.84 0 00-.84-.84L2 11.6z" />
    </svg>
  );
}

export default JiraIcon;
