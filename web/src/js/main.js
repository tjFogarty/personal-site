import { ready } from './utils'
import { TitleEffect } from './title-effect'
import { mobileNav } from './mobile-nav'
import { ListeningTo } from './listening-to'
import feather from 'feather-icons'

ready(async () => {
  mobileNav()
  TitleEffect.init()
  feather.replace()
  ListeningTo.init()

  if (document.querySelector('pre')) {
    let hljs = await System.import(
      /* webpackChunkName: "hljs" */ 'highlight.js'
    )
    hljs.initHighlightingOnLoad()
  }
})
