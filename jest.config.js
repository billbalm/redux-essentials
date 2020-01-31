module.exports = {
  testRegex: '[.]test[.]m?js$',
  transform: {
    '[.]m?js$': 'babel-jest',
  },
  moduleFileExtensions: ['mjs', 'js'],
};
