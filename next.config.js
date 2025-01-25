// next.config.js

module.exports = {

  // Example: Customize Webpack configuration
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { fs: false };  // Fix some node package issues for browser
    }
    return config;
  },

  // Example: Set up environment variables
  env: {
    API_URL: 'https://api.example.com',
  },
};
