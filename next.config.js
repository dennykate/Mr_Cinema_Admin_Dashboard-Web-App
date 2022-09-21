/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pics.dmm.co.jp", "i.postimg.cc", "di-ph.rdtcdn.com"],
  },
};

module.exports = nextConfig;
