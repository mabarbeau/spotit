const API_KEY = process.env.VUE_APP_MAPS_KEY

// @ts-ignore
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
  // @ts-ignore
  window.gmapsCallback = () => resolveInitPromise(window.google)

  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=gmapsCallback`
  script.onerror = rejectInitPromise
  document.body.appendChild(script)

  return initPromise
}
