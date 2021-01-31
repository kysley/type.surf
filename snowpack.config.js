// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-babel',
    '@snowpack/plugin-webpack',
  ],
  routes: [{match: 'routes', src: '.*', dest: '/index.html'}],
  // optimize: {
  //   bundle: true,
  //   minify: true,
  //   target: 'es2018',
  // },
  // installOptions: {},
  // devOptions: {},
  // buildOptions: {},
};
