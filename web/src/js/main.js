import { ready, showDeveloperMessage, env } from './utils'
import { Search } from './search'
import { PageVisibility } from './page-visibility'
import { Intro } from './intro'

ready(async () => {
  Search.init()
  PageVisibility.init()
  Intro.init()

  showDeveloperMessage()

  if (document.querySelector('pre')) {
    let codeBlocks = document.querySelectorAll('pre')
    // @ts-ignore
    let microlight = await import(/* webpackChunkName: "microlight" */ 'microlight')

    codeBlocks.forEach(block => block.classList.add('microlight'))

    microlight.reset()
  }
})

if ('serviceWorker' in navigator && env() === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })
  })
}
