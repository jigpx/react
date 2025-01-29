/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ['jigpx.com'], // Add your domain if you are using external images
    unoptimized: true, // Disable the Image Optimization API
  },
};

module.exports = nextConfig;