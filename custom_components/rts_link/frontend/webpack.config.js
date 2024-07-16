const path = require('path')

module.exports = [
  {
    mode: 'production',
    entry: './dist/panel/rts-link-panel.js',
    output: {
      filename: 'rts-link-panel.js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      fallback: {
        url: require.resolve('url/')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  }
]
