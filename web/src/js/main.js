import { ready } from './utils'
import { mobileNav } from './mobile-nav'
import { ListeningTo } from './listening-to'
import { Search } from './search'

ready(async () => {
  mobileNav()
  ListeningTo.init()
  Search.init()

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
