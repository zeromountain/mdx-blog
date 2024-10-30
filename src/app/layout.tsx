import type { Metadata } from 'next';
import localFont from 'next/font/local';

import 'react-notion-x/src/styles.css';

import Navigation from '@/components/common/navigation';
import { HomeLayout } from '@/components/layouts/home-layouts';
import { WithNextUIProvider } from '@/providers/with-next-ui-provider';

import './globals.css';

import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} overflow-hidden antialiased`}>
        <WithNextUIProvider>
          <Navigation />
          <HomeLayout>{children}</HomeLayout>
        </WithNextUIProvider>
      </body>
    </html>
  );
}
