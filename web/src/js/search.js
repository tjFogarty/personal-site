import { env } from './utils'
import createFocusTrap from 'focus-trap'

export const Search = {
  trigger: document.querySelectorAll('.js-search'),
  input: document.querySelector('.js-search-input'),
  container: document.querySelector('.js-search-container'),
  resultsContainer: document.querySelector('.js-search-results'),
  focusTrap: createFocusTrap('#search-dialog'),
  body: document.body,
  index: null,

  init() {
    this.handleTriggerClick = this.handleTriggerClick.bind(this)
    this.performSearch = this.performSearch.bind(this)

    document.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.container.classList.remove('is-open')
        this.resetSearch()
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

      if (content.hits && content.hits.length) {
        this.displayResults(content.hits)
      } else {
        this.displayNoResults()
      }
    } catch (e) {
      console.log('Error performing search: ', e)
    }
  },

  resetSearch() {
    this.body.style.overflow = ''
    this.input.value = ''
    this.focusTrap.deactivate()
    this.emptyResultContainer()
  },

  showSearch() {
    this.body.style.overflow = 'hidden'
    this.input.focus()
    this.focusTrap.activate()
  },

  async handleTriggerClick(e) {
    e.preventDefault()
    this.container.classList.toggle('is-open')

    if (this.container.classList.contains('is-open')) {
      this.showSearch()
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
    this.emptyResultContainer()

    results.forEach(result => {
      let resultLink = this.getResultLink(result)
      this.resultsContainer.appendChild(resultLink)
    })
  },

  emptyResultContainer() {
    while (this.resultsContainer.firstChild) {
      this.resultsContainer.removeChild(this.resultsContainer.firstChild)
    }
  },

  getResultLink(result) {
    let link = document.createElement('a')
    let title = document.createElement('h4')

    link.setAttribute('class', 'no-underline block mb-6')
    link.setAttribute('href', result.url)

    title.setAttribute('class', 'hover:text-primary')
    title.innerText = result.title

    link.appendChild(title)

    return link
  },

  displayNoResults() {
    this.resultsContainer.innerHTML = `<h3>No results found</h3>`
  }
}
