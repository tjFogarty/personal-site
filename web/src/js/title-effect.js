import inView from 'in-view'

/**
 * Subtle effect to move items slowly in the opposite direction
 * to current scroll direction
 * @type {Object}
 */
export const TitleEffect = {
  selector: 'h1',

  /**
   * Used to find which elements should be moving
   * @type {String}
   */
  movingClass: 'is-moving',

  /**
   * We'll divide the scroll position by this number
   * This will slow down the scroll effect
   * @type {Number}
   */
  dampenFactor: 25,

  init() {
    this.handleInView()
    this.handleScroll()
  },

  /**
   * Move elements that are in view
   */
  handleScroll() {
    window.addEventListener('scroll', this.moveElements.bind(this))
  },

  /**
   * Move elements that need to be moved
   */
  moveElements() {
    let els = document.querySelectorAll(`.${this.movingClass}`)
    let translateY = window.scrollY / this.dampenFactor

    els.forEach(el => {
      el.style.transform = `translateY(${translateY}px)`
    })
  },

  /**
   * Add/remove moving class when the element moves in
   * or out of view
   */
  handleInView() {
    inView(this.selector)
      .on('enter', this.setMoving.bind(this))
      .on('exit', this.unsetMoving.bind(this))
  },

  /**
   * Add the moving class and transition helpers
   * @param  {Object} el
   */
  setMoving(el) {
    el.classList.add(this.movingClass)
    el.style.willChange = 'transform'
  },

  /**
   * Remove the moving class and transition helpers
   * @param  {Object} el
   */
  unsetMoving(el) {
    el.classList.remove(this.movingClass)
    el.style.willChange = ''
  }
}
