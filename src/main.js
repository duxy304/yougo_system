import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/common.css'
import './router/permission.js'
import './utils/init'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import api from './api'
import './utils/eventBus'

Vue.prototype.$api = api
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
