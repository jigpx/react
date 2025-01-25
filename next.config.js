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

  // Optional: Setup for static export if needed
  // For static HTML export, you can use next export by running 'npm run export'
  // This setting is not strictly necessary but can help configure paths
  async exportPathMap() {
    return {
      '/': { page: '/' },
      // Include other routes you want to export here
    };
  }
};
