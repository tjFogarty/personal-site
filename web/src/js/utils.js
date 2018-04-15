export function ready(fn) {
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

export function showDeveloperMessage() {
  console.log(
    '%c Howdy, looking for the source? https://github.com/tjFogarty/personal-site',
    'color: #ac3b61'
  )
}

// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack
export function hasDoNotTrackEnabled() {
  let doNotTrack = navigator.doNotTrack

  // some browsers have this in the window object
  if ('doNotTrack' in window) {
    doNotTrack = window.doNotTrack
  }

  // if it isn't specified, let's not assume
  if (doNotTrack === 'unspecified') return true

  return doNotTrack === '1'
}
