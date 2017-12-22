export default {
  form: document.querySelector('.js-contact-form'),
  isSending: false,

  init() {
    this.handleSubmit = this.handleSubmit.bind(this)

    this.form.addEventListener('submit', this.handleSubmit)
  },

  handleSubmit(ev) {
    ev.preventDefault()
    let data = Array.from(new FormData(this.form).entries(), e =>
      e.map(encodeURIComponent).join('=')
    ).join('&')

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    fetch('/', {
      method: 'POST',
      body: data,
      mode: 'cors',
      headers
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.log(e)
      })
  }
}
