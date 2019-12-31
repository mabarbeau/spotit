import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './state/store'
import logger from './utils/logger'
import '@/components/_globals'
import './registerServiceWorker'
import './styles/main.scss'
import {} from 'googlemaps'

// eslint-disable-next-line func-names
window.onerror = function (message, source, lineno, colno) {
  logger.error({ message, source, lineno, colno })
}

Vue.config.productionTip = false

Vue.config.errorHandler = (err, vm, info) => {
  logger.error({
    message: err.toString(),
    name: vm.$options.name,
    info,
  })
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
