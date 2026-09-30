const path = require('path')

// tsc compiles src/ to dist/ first, webpack then bundles everything (lit included) in one file
module.exports = {
  mode: 'production',
  entry: './dist/panel/rts-link-panel.js',
  output: {
    filename: 'rts-link-panel.js',
    path: path.resolve(__dirname, 'dist')
  }
}
