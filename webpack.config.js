const path = require('path')
const WebpackBar = require('webpackbar')

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'webpackNumbers',
  },
  plugins: [new WebpackBar()],
}
