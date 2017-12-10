export function mobileNav() {
  let toggleNav = document.querySelector('.js-toggle-nav')
  let navInner = document.querySelector('.c-nav__inner')

  toggleNav.addEventListener('click', () => {
    navInner.classList.toggle('is-open')
  })
}
