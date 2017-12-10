const endpoint =
  'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=cowpuncher&api_key=dc2e7242feba68442dda3281bdd202f0&format=json&limit=1'

export const ListeningTo = {
  container: document.querySelector('.js-lt-container'),
  trigger: document.querySelector('.js-lt-trigger'),
  nowPlayingEl: document.querySelector('.c-now-playing'),
  urlEl: document.querySelector('.js-lt-url'),
  artistEl: document.querySelector('.js-lt-artist'),
  albumEl: document.querySelector('.js-lt-album'),
  infoEl: document.querySelector('.js-lt-info'),

  async init() {
    try {
      let { recenttracks } = await fetch(endpoint).then(res => res.json())
      this.updateRecentTrackDisplay(recenttracks.track[0])

      this.trigger.addEventListener('click', () => {
        this.nowPlayingEl.classList.toggle('is-active')
      })
    } catch (e) {}
  },

  updateRecentTrackDisplay({ album, artist, image, url }) {
    this.albumEl.textContent = album['#text']
    this.artistEl.textContent = artist['#text']
    this.urlEl.setAttribute('href', url)
    this.infoEl.style.backgroundImage = `url("${image[2]['#text']}")`
  }
}
