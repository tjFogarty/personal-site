const mix = require('laravel-mix')
const tailwindcss = require('tailwindcss')

mix
  .js('src/js/app.js', 'web/assets/js')
  .less('src/less/app.less', 'web/assets/css')
  .options({
    postCss: [tailwindcss('./tailwind.js')],
    purifyCss: {
      paths: ['templates/**/*.twig']
    }
  })
