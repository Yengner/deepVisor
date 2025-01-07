export default {
  reactStrictMode: true, // Enforces React's strict mode for better debugging
  images: {
    domains: ['example.com'], // Add any external image domains used in your project
  },
  webpackDevMiddleware: (config) => {
    // Adjust Webpack's watch options for better caching and rebuild handling
    config.watchOptions = {
      poll: 1000, // Check for changes every 1000ms (1 second)
      aggregateTimeout: 300, // Delay rebuild after the first change
    };
    return config;
  },
  output: 'standalone', 
};
