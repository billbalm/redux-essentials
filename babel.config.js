module.exports = {
  presets: [
    ['@babel/preset-env', { corejs: 3, modules: 'commonjs', targets: { node: 10 }, useBuiltIns: 'usage' }],
  ],
  plugins: [
    ['module-extension', { 'index(?:[.]m?js)?': '', 'm?js': '' }],
  ],
};
