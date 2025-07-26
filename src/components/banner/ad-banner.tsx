import React from 'react';

import { getRandomLink, LINKS } from '@/utils/ad-links';
import { AdBannerClient } from './ad-banner-client';


interface AdBannerProps {
  category: keyof typeof LINKS;
}

export default function AdBanner({ category }: AdBannerProps) {
  // 서버 사이드에서 랜덤 링크 선택
  const link = getRandomLink(category);

  if (!link) return null;

  return <AdBannerClient link={link} />;
}
