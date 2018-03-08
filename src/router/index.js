import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Rank from "components/rank/rank"
import Recommend from "components/Recommend/Recommend"
import Search from "components/Search/Search"
import Singer from "components/Singer/Singer"
import SingerDetail from 'components/Singerdetail/Singerdetail'



export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer,
      children:[
        {
          path: ':id',
          name: 'SingerDetail',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
    	path: '/search',
      name: 'Rank',
      component: Search
    }

  ]
})
