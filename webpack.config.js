const path = require('path')
// const glob = require('glob')
// const PurgecssPlugin = require('purgecss-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// class TailwindExtractor {
//   static extract(content) {
//     return content.match(/[A-z0-9-:\/]+/g) || []
//   }
// }

// const PATHS = {
//   templates: path.join(__dirname, 'templates/**/*.twig'),
//   js: path.join(__dirname, 'web/src/js/**/*.js')
// }

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
    // new PurgecssPlugin({
    //   paths: [glob.sync(PATHS.templates), glob.sync(PATHS.js)],
    //   whitelistPatterns: [
    //     /is-loaded/g,
    //     /hljs-?/g,
    //     /hljs-keyword/g,
    //     /hljs-attr/g,
    //     /hljs-string/g,
    //     /hljs-tag/g,
    //     /hljs-title/g,
    //     /hljs-params/g,
    //     /hljs-comment/g,
    //     /hljs-function/g,
    //     /hljs-subst/g,
    //     /hljs-number/g,
    //     /hljs-variable/g,
    //     /hljs-template-variable/g,
    //     /hljs-regexp/g,
    //     /hljs-name/g,
    //     /hljs-type/g,
    //     /hljs-attribute/g,
    //     /hljs-symbol/g,
    //     /hljs-bullet/g,
    //     /hljs-link/g,
    //     /hljs-built_in/g,
    //     /hljs-builtin-name/g,
    //     /hljs-meta/g,
    //     /hljs-title/g,
    //     /hljs-section/g,
    //     /hljs-addition/g,
    //     /hljs-deletion/g,
    //     /hljs-selector-class/g,
    //     /hljs-selector-id/g,
    //     /hljs-emphasis/g,
    //     /hljs-strong/g,
    //     /hljs-selector-tag/g
    //   ],
    //   extractors: [
    //     {
    //       extractor: TailwindExtractor,
    //       extension: ['js', 'twig']
    //     }
    //   ]
    // })
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
}

module.exports = WEBPACK_CONFIG
