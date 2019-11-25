export default function render(id, params = {}) {
  const init = new Promise((resolve) => {
    const tag = document.createElement('script')
    tag.src = 'https://apis.google.com/js/platform.js'
    tag.async = true
    tag.defer = true
    tag.onload = () => {
      resolve()
    }
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
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
    window.gapi.signin2.render(id, params)
  })
}
