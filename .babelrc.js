module.exports = {
  extends: '@snowpack/app-scripts-react/babel.config.json',
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {esmodules: true},
        bugfixes: true,
        modules: false,
        // corejs: 3,
        // useBuiltIns: 'usage',
      },
    ],
  ],
  plugins: ['babel-plugin-styled-components', 'graphql-tag'],
};
