import { create } from 'basicscroll'

export const Intro = {
  hero: document.querySelector('.c-hero'),

  init() {
    if (this.hero) {
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

      this.registerWorklet()

      instance.start()
    }
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
