const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd = phase === PHASE_PRODUCTION_BUILD;
  console.log(`isDev:${isDev}  isProd:${isProd}`);

  return {
    reactStrictMode: true,
    output: 'export',
    distDir: 'dist',
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.bbci.co.uk',
        },
        {
          protocol: 'http',
          hostname: '**.bbc.co.uk',
        },
        {
          protocol: 'https',
          hostname: '**.abc-cdn.net.au',
        },
        {
          protocol: 'https',
          hostname: '**.**',
        },
        {
          protocol: 'https',
          hostname: '**.**.**',
        },
      ],
    },
    env: {
      SERVER_NAME: isDev
        ? 'http://localhost:3000/'
        : 'https://YOUR-DOMAIN-HERE.vercel.app/',
      NEWS_API_KEY: process.env.NEWS_API_KEY,
    },
  };
};