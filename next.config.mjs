/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'cdn.prod.website-files.com',
      'www.designrush.com',
      'assets.aceternity.com',
      'images.unsplash.com',
      'i.ibb.co',
      'i.ibb.co.com',
      'framerusercontent.com',
      'www.aceternity.com',
      'aceternity.com',
      'ui.aceternity.com',
    ],
  },
};

export default nextConfig;