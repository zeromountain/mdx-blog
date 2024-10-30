/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

export default nextConfig;
