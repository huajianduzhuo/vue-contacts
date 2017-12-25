// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueScroller from 'vue-scroller'
import App from './App'
import router from './router'
import './assets/common.js'
import 'normalize.css'
import './assets/common.css'

Vue.config.productionTip = false
Vue.use(VueScroller)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
