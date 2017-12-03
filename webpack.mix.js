const mix = require('laravel-mix')
const tailwindcss = require('tailwindcss')

mix
  .setPublicPath(__dirname)
  .js('src/js/main.js', 'web/assets/js')
  .less('src/less/app.less', 'web/assets/css')
  .webpackConfig({
    output: {
      chunkFilename: 'web/assets/js/chunks/[name].js'
    }
  })
  .options({
    postCss: [tailwindcss('./tailwind.js')]
  })
  .version()
