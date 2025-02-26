import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

type Locale = 'ko' | 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const [common] = await Promise.all([import(`./locales/${locale}/common.json`).then((module) => module.default)]);

  return {
    locale,
    messages: {
      common,
    },
  };
});
