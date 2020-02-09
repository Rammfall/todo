// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = ctx => ({
  parser: false,
  map: false,
  // eslint-disable-next-line global-require,import/no-extraneous-dependencies
  plugins: [require('autoprefixer'), require('cssnano')]
});
