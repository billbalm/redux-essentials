module.exports = {
  presets: [
    ['@babel/preset-env', { corejs: 3, targets: { node: 10 }, useBuiltIns: 'usage' }],
  ],
};
