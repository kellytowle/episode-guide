import Vue from 'vue'
import Router from 'vue-router'
import * as Components from '@/components'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorldScreen',
      component: Components.HelloWorldScreen
    },
    {
      path: '/episodes',
      name: 'EpisodeSearchScreen',
      component: Components.EpisodeSearchScreen
    }
  ]
})
