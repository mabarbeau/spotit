import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './state/store'
import logger from './logger'
import './registerServiceWorker'
import './styles/main.scss'
import {} from 'googlemaps'

window.onerror = function(message, source, lineno, colno, error) {
  logger.error({ message, source, lineno, colno, error })
}

Vue.config.productionTip = false

Vue.config.errorHandler = (err, vm, info) => {
  // err: error trace
  // vm: component in which error occurred
  // info: Vue specific error information such as life cycle hooks, events etc.
  logger.error({ err, vm, info })
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
