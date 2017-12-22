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

  // if (document.querySelector('.js-contact-form')) {
  //   try {
  //     let ContactForm = await System.import(
  //       /* webpackChunkName: "contact" */ './contact-form'
  //     )
  //     ContactForm.default.init()
  //   } catch (e) {
  //     console.log('Error loading contact form', e)
  //   }
  // }
})
