import createMiddleware from 'next-intl/middleware';

import { routing } from './app/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(ko|en)/:path*'],
};
