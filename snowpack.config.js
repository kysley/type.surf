// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

const CompressionPlugin = require('compression-webpack-plugin');

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: {url: '/', static: true},
    src: {url: '/dist'},
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-babel',
    [
      '@snowpack/plugin-webpack',
      {
        extendConfig: (config) => {
          config.plugins.push(new CompressionPlugin());
          return config;
        },
      },
    ],
  ],
  // routes: [{match: 'routes', src: '.*', dest: '/index.html'}],
  routes: [
    /* Enable an SPA Fallback in development: */
    {match: 'routes', src: '.*', dest: '/index.html'},
  ],
  // optimize: {
  // bundle: true,
  // minify: true,
  // target: 'es2018',
  // },
  // installOptions: {},
  // devOptions: {},
  // buildOptions: {},
};
