const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

let env = process.env.NODE_ENV
let isDev = env === 'development'

const WEBPACK_CONFIG = {
  mode: env,
  entry: {
    main: './web/src/js/main.js',
    styles: './web/src/less/app.less'
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'web'),
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/chunks/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['web/assets']),
    new MiniCssExtractPlugin({
      filename: 'assets/css/app.css'
    })
  ]
}

if (!isDev) {
  WEBPACK_CONFIG.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }

  WEBPACK_CONFIG.plugins.push(
    // @ts-ignore
    new SWPrecacheWebpackPlugin({
      // @ts-ignore
      cacheId: 'tj',
      filename: 'sw.js',
      stripPrefix: 'web/',
      staticFileGlobs: ['web/assets/**/*.js']
    })
  )
}

module.exports = WEBPACK_CONFIG
