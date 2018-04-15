import galite from 'ga-lite'
import { env, hasDoNotTrackEnabled } from './utils'

export const Tracking = {
  gaTrackingId: 'UA-110493614-1',
  shouldTrack: env() === 'production' && !hasDoNotTrackEnabled(),

  setup() {
    if (!this.shouldTrack) return

    galite('create', this.gaTrackingId, 'auto')
  },

  sendPageView() {
    if (!this.shouldTrack) return

    galite('send', 'pageview')
  }
}
