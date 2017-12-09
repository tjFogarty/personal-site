import { ready } from './utils'
import { TitleEffect } from './title-effect'

ready(async () => {
  TitleEffect.init()

  if (document.querySelector('pre')) {
    let hljs = await System.import(
      /* webpackChunkName: "hljs" */ 'highlight.js'
    )
    hljs.initHighlightingOnLoad()
  }
})
