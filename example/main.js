import Vue from 'Vue'
import App from './App.vue'

import nocaptcha from '../src/index'

Vue.config.productionTip = false
Vue.use(nocaptcha)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  template: '<App/>',
  components: {App}
})
