// https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API

let hidden, visibilityChange;

if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden'
  visibilityChange = 'visibilitychange'
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden'
  visibilityChange = 'msvisibilitychange'
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden'
  visibilityChange = 'webkitvisibilitychange'
}

export const PageVisibility = {
  asleepEmoji: '💤',
  awakeEmoji: '😄',
  originalTitle: document.title,

  init() {
    if (typeof document.hidden === 'undefined') return

    this.handleVisibilityChange = this.handleVisibilityChange.bind(this)

    document.addEventListener(visibilityChange, this.handleVisibilityChange, false)
  },

  handleVisibilityChange() {
    let emoji = this.awakeEmoji

    if (document[hidden]) {
      emoji = this.asleepEmoji
    }

    document.title = `${emoji} ${this.originalTitle}`
  }
}