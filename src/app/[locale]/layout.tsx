import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';

import Navigation from '@/components/common/navigation';
import { HomeLayout } from '@/components/layouts/home-layouts';
import { WithHeroUIProvider } from '@/providers/with-next-ui-provider';

import { routing } from '../i18n/routing';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: `zeromountain's blog`,
  description: '프론트엔드 개발자 손영산의 블로그입니다.',
};

type Locale = 'ko' | 'en';

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} overflow-hidden antialiased`}>
        <WithHeroUIProvider>
          <NextIntlClientProvider messages={messages}>
            <Navigation />
            <HomeLayout>{children}</HomeLayout>
          </NextIntlClientProvider>
        </WithHeroUIProvider>
      </body>
    </html>
  );
}
