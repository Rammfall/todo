const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpInCss = require('webp-in-css/plugin');

module.exports = ctx => {
  const { mode } = ctx.webpack;
  const development = mode === 'development';

  return {
    parser: false,
    map: false,
    plugins: [webpInCss, autoprefixer, development && cssnano]
  };
};
