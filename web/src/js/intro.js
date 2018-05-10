import { create } from 'basicscroll'

export const Intro = {
  hero: document.querySelector('.c-hero'),

  init() {
    if (this.hero) {
      this.loadBasicScroll()
      this.registerWorklet()
    }
  },

  async loadBasicScroll() {
    let {
      create
    } = await import(/* webpackChunkName: "basicscroll" */ 'basicscroll')

    const instance = create({
      elem: this.hero,
      from: '0',
      to: '300px',
      props: {
        '--hero-position-y': {
          from: '0%',
          to: '5%'
        }
      }
    })

    instance.start()
  },

  async registerWorklet() {
    if ('paintWorklet' in window.CSS) {
      await window.CSS.paintWorklet.addModule('/paint/separator.js')
      this.hero.setAttribute(
        'style',
        '--separator-shape:curve-right; --separator-size: 35px;'
      )
      this.hero.classList.add('is-loaded')
    }
  }
}
