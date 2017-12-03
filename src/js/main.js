import { ready } from './utils'

ready(() => {
  let pre = document.querySelector('pre')
  
  if (pre) {
    System.import(/* webpackChunkName: "prism" */'prismjs')
      .then(Prism => {
        Prism.highlightAll()
      })
  }
})