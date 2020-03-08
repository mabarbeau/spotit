const API_KEY = process.env.VUE_APP_MAPS_KEY

let initialized = !!window.google
let resolveInitPromise: any
let rejectInitPromise: OnErrorEventHandler
const initPromise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve
  rejectInitPromise = reject
})

export default function load() {
  if (initialized) return initPromise

  initialized = true
  window.gmapsCallback = () => resolveInitPromise(window.google)

  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=gmapsCallback`
  script.onerror = rejectInitPromise
  document.body.appendChild(script)

  return initPromise
}
