import nocaptcha from './nocaptcha.vue'
import smartcaptcha from './smartcaptcha.vue'

export {
  nocaptcha,
  smartcaptcha
}

export default function (Vue) {
  Vue.component('nocaptcha', nocaptcha)
  Vue.component('smartcaptcha', smartcaptcha)
}
