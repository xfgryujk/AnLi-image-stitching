import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueI18n from 'vue-i18n'

import enMessage from './lang/en'
import zhMessage from './lang/zh'

import anliNavbar from './components/anliNavbar'
import App from './App'

Vue.use(BootstrapVue)
Vue.use(VueI18n)

let locale = window.localStorage.getItem('lang')
if (!locale) {
  locale = navigator.language.startsWith('zh') ? 'zh' : 'en'
}
const i18n = new VueI18n({
  locale: locale,
  messages: {
    en: enMessage,
    zh: zhMessage
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#navbar',
  components: {
    anliNavbar
  },
  i18n
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  i18n
})
