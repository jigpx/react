module.exports = {
  // Customize Webpack configuration
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = { fs: false };  // Fix some node package issues for the browser
    }
    return config;
  },

  // Set up environment variables
  env: {
    API_URL: 'https://api.example.com',
  },

  // Static export setup
  output: 'export',  // Required for static HTML export

  // Optional: Setup for static export (next export is now handled by the `output` setting)
  // This exportPathMap is no longer necessary unless you have additional custom routes to define
  // async exportPathMap() {
  //   return {
  //     '/': { page: '/' },
  //     // Add other custom routes if needed
  //   };
  // }
};
