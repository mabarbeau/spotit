export default function render(id: string, params = {}) {
  const init = new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      resolve()
    }
    document.body.appendChild(script)
  })
  init.then(() => {
    params = {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      ...params,
    }
    // @ts-ignore
    window.gapi.signin2.render(id, params)
  })
}
