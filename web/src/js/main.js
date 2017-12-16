import { ready } from './utils'
import { mobileNav } from './mobile-nav'
import { ListeningTo } from './listening-to'

ready(async () => {
  mobileNav()
  ListeningTo.init()

  if (document.querySelector('pre')) {
    try {
      let hljs = await System.import(
        /* webpackChunkName: "hljs" */ 'highlight.js'
      )
      hljs.initHighlightingOnLoad()
    } catch (e) {
      console.log('Error loading highlight.js', e)
    }
  }
})
