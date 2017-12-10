import feather from 'feather-icons'

const endpoint =
  'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=cowpuncher&api_key=dc2e7242feba68442dda3281bdd202f0&format=json&limit=1'

export const ListeningTo = {
  container: document.querySelector('.js-lt-container'),
  trigger: document.querySelector('.js-lt-trigger'),
  nowPlayingEl: document.querySelector('.c-now-playing'),

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
    let html = `
      <div class="c-now-playing__info" style="background-image: url('${
        image[2]['#text']
      }'); background-size: cover; background-position: 50%;">
        <div class="c-now-playing__text">
          <a href="${
            url
          }" rel="noopener" target="_blank" class="flex items-center">
          <span class="text-sm">${album['#text']} -&nbsp;</span>
          <span class="text-sm">${artist['#text']}</span>
          </a>
        </div>
      </div>
    `

    this.container.innerHTML = html

    feather.replace()
  }
}
