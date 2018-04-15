import galite from 'ga-lite'
import { env } from './utils'

export const Tracking = {
  gaId: 'UA-110493614-1',
  shouldTrack: false,

  setup() {
    this.shouldTrack = env() === 'production' && !this.hasDoNotTrackEnabled()

    if (!this.shouldTrack) return

    galite('create', 'UA-110493614-1', 'auto')
  },

  sendPageView() {
    if (!this.shouldTrack) return

    galite('send', 'pageview')
  },

  hasDoNotTrackEnabled() {
    if (!('doNotTrack' in navigator)) return false

    return navigator.doNotTrack || navigator.doNotTrack === '1'
  }
}
