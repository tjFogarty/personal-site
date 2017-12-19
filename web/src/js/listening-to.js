const endpoint =
  'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=cowpuncher&api_key=dc2e7242feba68442dda3281bdd202f0&format=json&limit=1'

export const ListeningTo = {
  hoverTrigger: document.querySelector('.js-lt-trigger'),

  init() {
    this.updateRecentTrackVariable('Loading...')

    this.hoverTrigger.addEventListener(
      'mouseenter',
      this.fetchLatestTrack.bind(this),
      { once: true }
    )
  },

  async fetchLatestTrack() {
    try {
      let { recenttracks } = await fetch(endpoint).then(res => res.json())
      let { artist, name } = recenttracks.track[0]

      this.updateRecentTrackVariable(
        `Currently listening to: ${name} by ${artist['#text']}`
      )
    } catch (e) {
      this.updateRecentTrackVariable(`Error loading track: ${e}`)
    }
  },

  updateRecentTrackVariable(value) {
    document.documentElement.style.setProperty(
      '--current-track',
      `'${value.replace(/'/g, '')}'`
    )
  }
}
