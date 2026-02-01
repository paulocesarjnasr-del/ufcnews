/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mmajunkie.usatoday.com',
      },
      {
        protocol: 'https',
        hostname: 'usatmmajunkie.files.wordpress.com',
      },
      {
        protocol: 'https',
        hostname: 'dmxg5wxfqgb4u.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'www.ufc.com',
      },
      {
        protocol: 'https',
        hostname: 'ufc.com',
      },
      {
        protocol: 'https',
        hostname: 'platform.mmamania.com',
      },
      {
        protocol: 'https',
        hostname: 'www.mmamania.com',
      },
    ],
  },
};

module.exports = nextConfig;
