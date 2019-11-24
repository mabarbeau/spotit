const API_KEY = process.env.VUE_APP_MAPS_KEY

let initialized = !!window.google
let resolveInitPromise
let rejectInitPromise
const initPromise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve
  rejectInitPromise = reject
})

export default function init() {
  if (initialized) return initPromise

  initialized = true
  window.gmapsCallback = () => resolveInitPromise(window.google)

  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=gmapsCallback`
  script.onerror = rejectInitPromise
  document.querySelector('head').appendChild(script)

  return initPromise
}
