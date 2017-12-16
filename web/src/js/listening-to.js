const endpoint =
  'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=cowpuncher&api_key=dc2e7242feba68442dda3281bdd202f0&format=json&limit=1'

export const ListeningTo = {
  async init() {
    try {
      let { recenttracks } = await fetch(endpoint).then(res => res.json())
      this.updateRecentTrackVariable(recenttracks.track[0])
    } catch (e) {
      console.log(e)
    }
  },

  updateRecentTrackVariable({ artist, name }) {
    document.documentElement.style.setProperty(
      '--current-track',
      `'Currently listening to:  ${name} by ${artist['#text']}'`
    )
  }
}
