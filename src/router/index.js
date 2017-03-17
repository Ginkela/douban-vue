import Vue from 'vue'
import Router from 'vue-router'
import allMoviePage from '../components/movie/allMoviePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/allMoviePage',
      name: 'allMoviePage',
      component: allMoviePage
    }
  ]
})
