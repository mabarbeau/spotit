import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './state/store'
import logger from './utils/logger'
import '@/components/_globals'
import './registerServiceWorker'
import './styles/main.scss'
import {} from 'googlemaps'
import vuetify from './plugins/vuetify'
import Pusher from 'pusher-js'

// eslint-disable-next-line func-names
window.onerror = function(message, source, lineno, colno) {
  logger.error({ message, source, lineno, colno })
}

Vue.config.productionTip = false

Vue.config.errorHandler = (error, vm, info) => {
  console.error(error)
  logger.error({
    message: error.toString(),
    name: vm.$options.name,
    info,
  })
}

Pusher.logToConsole = true
Vue.prototype.$pusher = new Pusher('d4babe8cf31df6ecfd73', {
  cluster: 'us3',
  forceTLS: true,
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
