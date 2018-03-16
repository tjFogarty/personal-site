export const PageVisibility = {
  asleepEmoji: '💤',
  originalTitle: document.title,

  init () {
    if (typeof document.hidden === 'undefined') return

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this)

    document.addEventListener('visibilitychange', this.handleVisibilityChange, false)
  },

  handleVisibilityChange () {
    let title = this.originalTitle

    if (document.hidden) {
      title = `${this.asleepEmoji} ${title}`
    }

    document.title = title
  }
}
