import { ready, showDeveloperMessage } from './utils'
import { mobileNav } from './mobile-nav'
import { Search } from './search'
import { PageVisibility } from './page-visibility'
import { Intro } from './intro'

ready(async () => {
  mobileNav()
  Search.init()
  PageVisibility.init()
  Intro.init()

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
