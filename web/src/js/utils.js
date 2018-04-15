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

export function hasDoNotTrackEnabled() {
  // if it's not supported, leave it off
  if (!('doNotTrack' in navigator)) return true

  let { doNotTrack } = navigator

  // if it isn't specified, let's not assume
  if (doNotTrack === 'unspecified') return true

  return doNotTrack || doNotTrack === '1'
}
