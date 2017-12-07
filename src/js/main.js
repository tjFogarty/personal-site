import { ready } from './utils'
import { TitleEffect } from './title-effect'
import hljs from 'highlight.js'

ready(() => {
  TitleEffect.init()
  hljs.initHighlightingOnLoad()
})
