export function ready(fn) {
  document.addEventListener('DOMContentLoaded', fn)
}

export function env() {
  if (process && process.env && process.env.NODE_ENV) {
    return process.env.NODE_ENV
  }

  return 'production'
}

export function showDeveloperMessage() {
  console.log(
    '%c Howdy, looking for the source? https://github.com/tjFogarty/personal-site',
    'color: #ac3b61'
  )
}

// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack
export function hasDoNotTrackEnabled() {
  let doNotTrack = navigator.doNotTrack || window.doNotTrack

  return doNotTrack === '1'
}
