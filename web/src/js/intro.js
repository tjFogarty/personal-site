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

      instance.start()
    }
  }
}
