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
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'platform.mmafighting.com',
      },
      {
        protocol: 'https',
        hostname: 'www.mmafighting.com',
      },
      {
        protocol: 'https',
        hostname: 'www.lowkickmma.com',
      },
      {
        protocol: 'https',
        hostname: 'lowkickmma.com',
      },
    ],
  },
};

module.exports = nextConfig;
