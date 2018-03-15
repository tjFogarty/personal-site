import { ready, showDeveloperMessage, env } from './utils'
import { Search } from './search'
import { PageVisibility } from './page-visibility'
import { Intro } from './intro'
import galite from 'ga-lite'

if (env() === 'production') {
  galite('create', 'UA-110493614-1', 'auto')
  galite('send', 'pageview')
}

ready(async () => {
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
