import { env } from './utils'

export const Search = {
  trigger: document.querySelectorAll('.js-search'),
  input: document.querySelector('.js-search-input'),
  container: document.querySelector('.js-search-container'),
  resultsContainer: document.querySelector('.js-search-results'),
  index: null,

  init() {
    this.handleTriggerClick = this.handleTriggerClick.bind(this)
    this.performSearch = this.performSearch.bind(this)

    document.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.container.classList.remove('is-open')
      }
    })

    this.trigger.forEach(trigger => {
      trigger.addEventListener('click', this.handleTriggerClick)
    })

    this.input.addEventListener('keyup', this.performSearch)
  },

  async performSearch(event) {
    if (!this.index) return

    let query = event.target.value

    try {
      let content = await this.index.search({ query })

      if (content.hits) {
        this.displayResults(content.hits)
      } else {
        this.displayNoResults()
      }
    } catch (e) {
      console.log('Error performing search: ', e)
    }
  },

  resetSearch() {
    this.input.value = ''
    this.resultsContainer.innerHTML = ''
  },

  async handleTriggerClick(e) {
    e.preventDefault()
    this.container.classList.toggle('is-open')

    if (this.container.classList.contains('is-open')) {
      this.input.focus()
    } else {
      this.resetSearch()
    }

    try {
      await this.loadSearchClient()
    } catch (e) {
      console.log('Error: ', e)
    }
  },

  async loadSearchClient() {
    try {
      let algoliasearch = await System.import(
        /* webpackChunkName: "search" */ 'algoliasearch/lite'
      )

      let client = algoliasearch(
        'B5ZTA540XE',
        '5760522b641a5ab4334c5a2806c4aa67'
      )
      this.index = client.initIndex(
        env() === 'development' ? 'dev_posts' : 'prod_posts'
      )
    } catch (e) {
      console.log('Error loading search client', e)
    }
  },

  displayResults(results) {
    let resultHTML = results.map(result => {
      return `<a href="${
        result.url
      }" class="no-underline block mb-6 hover:text-primary">
          <h4 class="hover:text-primary">${result.title}</h4>
        </a>`
    })

    this.resultsContainer.innerHTML = resultHTML.join('')
  },

  displayNoResults() {
    this.resultsContainer.innerHTML = `<h3>No results found</h3>`
  }
}
