import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import anliNavbar from './components/anliNavbar'
import App from './App'

Vue.use(BootstrapVue)

new Vue({
  el: '#navbar',
  components: {
    anliNavbar
  }
})

new Vue({
  el: '#app',
  components: {
    App
  }
})
