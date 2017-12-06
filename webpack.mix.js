const mix = require('laravel-mix')
const tailwindcss = require('tailwindcss')

mix
  .setPublicPath(__dirname)
  .browserSync('http://tj-craft.dev')
  .js('src/js/main.js', 'web/assets/js')
  .less('src/less/app.less', 'web/assets/css')
  .extract(['highlight.js'])
  .options({
    postCss: [tailwindcss('./tailwind.js')]
  })
  .version()
