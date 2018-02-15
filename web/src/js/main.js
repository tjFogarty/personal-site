import { ready, showDeveloperMessage } from './utils'
import { mobileNav } from './mobile-nav'
import { ListeningTo } from './listening-to'
import { Search } from './search'
import { PageVisibility } from './page-visibility'

ready(async () => {
  mobileNav()
  ListeningTo.init()
  Search.init()
  PageVisibility.init()

  showDeveloperMessage()

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
