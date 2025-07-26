'use client';

import { getRandomLink } from '@/utils/ad-links';

interface AdBannerClientProps {
  link: NonNullable<ReturnType<typeof getRandomLink>>;
}

export function AdBannerClient({ link }: AdBannerClientProps) {
  return (
    <div
      className="relative mx-auto my-2 flex w-full flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white p-2 shadow-md"
      onClick={() => {
        window.open(link.url, '_blank');
      }}
    >
      <p className="text-center text-xs text-gray-500 md:text-sm">
        [본 게시물은 파트너스 활동의 일환으로 소정의 수수료를 받을 수 있습니다.]
      </p>
      <div className="flex w-full cursor-pointer flex-col items-center gap-4 md:flex-row">
        {link.image && (
          <picture>
            {/* <source srcSet={link.image} type="image/avif" /> */}
            <img src={link.image} alt="ad-banner" className="mb-3 h-40 w-full object-contain" />
          </picture>
        )}
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold">{link.title}</p>
          <p className="text-xs text-gray-500">{link.desc}</p>
        </div>
      </div>
    </div>
  );
}
