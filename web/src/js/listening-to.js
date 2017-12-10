import feather from 'feather-icons'

const endpoint =
  'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=cowpuncher&api_key=dc2e7242feba68442dda3281bdd202f0&format=json&limit=1'

export const ListeningTo = {
  container: document.querySelector('.js-lt-container'),

  async init() {
    try {
      let { recenttracks } = await fetch(endpoint).then(res => res.json())
      this.updateRecentTrackDisplay(recenttracks.track[0])
    } catch (e) {}
  },

  updateRecentTrackDisplay({ album, artist, image, url }) {
    let html = `
      <div class="flex items-center mr-5">
        <i data-feather="music" class="mr-4"></i>
        <a href="${
          url
        }" rel="noopener" target="_blank" class="flex items-center">
          <img class="mr-3" src="${image[0]['#text']}">
          <span class="text-sm">${album['#text']} -&nbsp;</span>
          <span class="text-sm">${artist['#text']}</span>
        </a>
      </div>
    `

    this.container.innerHTML = html

    feather.replace()
  }
}
