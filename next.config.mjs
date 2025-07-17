import fs from 'fs';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin('./src/app/i18n/request.ts');

const generateVerificationFile = () => {
  const verificationCode = process.env.GOOGLE_SITE_VERIFICATION;
  if (verificationCode) {
    const content = `google-site-verification: ${verificationCode}`;
    const filePath = path.join(process.cwd(), 'public', verificationCode);
    fs.writeFileSync(filePath, content);
  }
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      generateVerificationFile();
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },

      {
        protocol: 'https',
        hostname: 'noticon-static.tammolo.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
