import React from 'react';

import { getRandomLink } from '@/utils/ad-links';

export default function AdBanner() {
  const link = getRandomLink('nextjs');

  if (!link) return null;

  return (
    <div className="mx-auto my-6 flex w-full max-w-xl flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-md">
      <div
        className="flex cursor-pointer flex-row items-center gap-4"
        onClick={() => {
          window.open(link.url, '_blank');
        }}
      >
        <img src={link.image} alt="ad-banner" className="mb-3 h-40 w-full object-cover" />
        <div className="flex flex-col">
          <p className="text-sm font-bold">{link.title}</p>
          <p className="text-sm text-gray-500">{link.desc}</p>
        </div>
      </div>
    </div>
  );
}
