import { ready, showDeveloperMessage } from './utils'
import { Search } from './search'
import { PageVisibility } from './page-visibility'
import { Intro } from './intro'
import { Tracking } from './tracking'

ready(async () => {
  Search.init()
  PageVisibility.init()
  Intro.init()

  Tracking.setup()
  Tracking.sendPageView()

  showDeveloperMessage()

  if (document.querySelector('pre')) {
    let hljs = await import(/* webpackChunkName: "hljs" */ 'highlight.js')
    hljs.initHighlightingOnLoad()
  }
})
