import { ready } from './utils'
import { TitleEffect } from './title-effect'

ready(async () => {
  let toggleNav = document.querySelector('.js-toggle-nav')
  let navInner = document.querySelector('.c-nav__inner')

  toggleNav.addEventListener('click', () => {
    navInner.classList.toggle('is-open')
  })

  TitleEffect.init()

  if (document.querySelector('pre')) {
    let hljs = await System.import(
      /* webpackChunkName: "hljs" */ 'highlight.js'
    )
    hljs.initHighlightingOnLoad()
  }
})
