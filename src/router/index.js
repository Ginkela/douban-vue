import Vue from 'vue'
import Router from 'vue-router'
import allMoviePage from '../pages/movie/allMoviePage'
import inTheaters from '../pages/movie/inTheaters'
import commingSoon from '../pages/movie/commingSoon'
import movieInfo from '../pages/movie/movieInfo'
import search from '../pages/movie/search'
import top250 from '../pages/movie/top250'
import us_box from '../pages/movie/us_box'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
     {
      path: '/',
      component: allMoviePage
    },
    {
      path: '/allMoviePage',
      name: 'allMoviePage',
      component: allMoviePage 
    },
    {
      path: '/inTheaters',
      name: 'inTheaters',
      component: inTheaters
    },
    {
      path: '/commingSoon',
      name: 'commingSoon',
      component: commingSoon
    },
    {
      path: '/movieInfo:id',
      name: 'movieInfo',
      component: movieInfo
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/top250',
      name: 'top250',
      component: top250
    },
    {
      path: '/us_box',
      name: 'us_box',
      component: us_box
    }
  ]
})
