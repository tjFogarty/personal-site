// Based on https://medium.com/@AndrewDelPrete/using-purifycss-to-remove-unused-tailwind-css-classes-173b3ee8ee01

const mix = require('laravel-mix')
const tailwindcss = require('tailwindcss')
const glob = require('glob-all')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
//
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g)
  }
}

let webpackConfig = {
  output: {
    chunkFilename: 'assets/js/chunks/[name].js'
  }
}

if (mix.inProduction()) {
  webpackConfig.plugins = [
    new CleanWebpackPlugin(['assets']),
    new SWPrecacheWebpackPlugin({
      cacheId: 'tj',
      filepath: path.join(__dirname, '/web/sw.js'),
      maximumFileSizeToCacheInBytes: 4194304,
      minify: false,
      staticFileGlobs: ['web/fonts/open-sans.woff2', 'web/fonts/raleway.woff2'],
      stripPrefix: 'web',
      runtimeCaching: [
        {
          handler: 'cacheFirst',
          urlPattern: /fonts\/.*$/
        }
      ]
    }),
    new PurgecssPlugin({
      // Specify the locations of any files you want to scan for class names.
      paths: glob.sync([
        path.join(__dirname, 'templates/**/*.twig'),
        path.join(__dirname, 'web/assets/**/*.js')
      ]),
      whitelistPatterns: [
        /hljs/g,
        /hljs-keyword/g,
        /hljs-attr/g,
        /hljs-string/g,
        /hljs-tag/g,
        /hljs-title/g,
        /hljs-params/g,
        /hljs-comment/g,
        /hljs-function/g,
        /hljs-subst/g,
        /hljs-number/g,
        /hljs-variable/g,
        /hljs-template-variable/g,
        /hljs-regexp/g,
        /hljs-name/g,
        /hljs-type/g,
        /hljs-attribute/g,
        /hljs-symbol/g,
        /hljs-bullet/g,
        /hljs-link/g,
        /hljs-built_in/g,
        /hljs-builtin-name/g,
        /hljs-meta/g,
        /hljs-title/g,
        /hljs-section/g,
        /hljs-addition/g,
        /hljs-deletion/g,
        /hljs-selector-class/g,
        /hljs-selector-id/g,
        /hljs-emphasis/g,
        /hljs-strong/g,
        /hljs-selector-tag/g
      ],
      extractors: [
        {
          extractor: TailwindExtractor,

          // Specify the file extensions to include when scanning for
          // class names.
          extensions: ['html', 'js', 'php', 'twig']
        }
      ]
    })
  ]
}

mix
  .setPublicPath('web')
  .browserSync({
    proxy: 'https://tj-craft.dev',
    files: ['./templates/**/*.twig']
  })
  .js('web/src/js/main.js', 'assets/js')
  .less('web/src/less/app.less', 'assets/css')
  .extract(['in-view'])
  .options({
    postCss: [tailwindcss('./tailwind.js')]
  })
  .webpackConfig(webpackConfig)
  .version()

// Only run PurgeCSS during production builds for faster development builds
// and so you still have the full set of utilities available during
// development.
