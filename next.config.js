/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['scontent-lga3-1.cdninstagram.com'], // Add the external image domains here
    unoptimized: true, // Disable the Image Optimization API
  },
};

module.exports = nextConfig;