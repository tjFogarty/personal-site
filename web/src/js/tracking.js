import { env, hasDoNotTrackEnabled } from './utils'

export const Tracking = {
  gaTrackingId: 'UA-110493614-1',
  galite: null,
  shouldTrack: env() === 'production' && !hasDoNotTrackEnabled(),

  async setup() {
    if (!this.shouldTrack) return

    this.loadGA()
  },

  async loadGA() {
    this.galite = await import(/* webpackChunkName: "ga-lite" */ 'ga-lite')
    this.galite('create', this.gaTrackingId, 'auto')
  },

  sendPageView() {
    if (!this.shouldTrack) return

    this.galite('send', 'pageview')
  }
}
