export function ready (fn) {
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

export const env = () => {
  return process && process.env && process.env.NODE_ENV
    ? process.env.NODE_ENV
    : null
}

export function showDeveloperMessage () {
  console.log(
    '%c Howdy, looking for the source? https://github.com/tjFogarty/personal-site',
    'color: #222'
  )
}
