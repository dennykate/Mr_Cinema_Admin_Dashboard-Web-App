/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pics.dmm.co.jp", "i.postimg.cc"],
  },
};

module.exports = nextConfig;
