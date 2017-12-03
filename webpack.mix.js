const mix = require('laravel-mix')
const tailwindcss = require('tailwindcss')

mix
  .setPublicPath(__dirname)
  .js('src/js/main.js', 'web/assets/js')
  .less('src/less/app.less', 'web/assets/css')
  .options({
    postCss: [tailwindcss('./tailwind.js')]
  })
  .version()
