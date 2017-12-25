import Vue from 'vue'
import Router from 'vue-router'
import mobile from '@/components/mobile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mobile',
      component: mobile
    }
  ]
})
