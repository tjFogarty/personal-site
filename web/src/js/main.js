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
    let microlight = await import(/* webpackChunkName: "microlight" */ 'microlight')
    let codeBlocks = document.querySelectorAll('pre')

    codeBlocks.forEach(block => {
      block.classList.add('microlight')
    })

    microlight.reset()
  }
})
