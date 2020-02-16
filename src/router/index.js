import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Dash from '@/components/Dash'
import collectionIndex from '@/components/collection/index'
import collectionData from '@/components/collection/collection-data'
import hadoopCluster from '@/components/collection/hadoop-cluster'
import scheduling from '@/components/scheduling/scheduling'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/index',
      name: 'dash',
      component: Dash
    },
    //采集数据开始
    {
      path: '/index/collection',
      component: collectionIndex,
      name: '数据治理',
      meta: {
        title: '数据源管理'
      }
    },
    {
      path: '/index/collection-data',
      component: collectionData,
      name: '数据治理',
      meta: {
        title: '采集关系'
      }
    },
    {
      path: '/index/hadoop-cluster',
      component: hadoopCluster,
      name: '数据治理',
      meta: {
        title: '大数据节点'
      }
    },
    //采集数据结束
    //数据调度开始
    {
      path: '/index/scheduling',
      component: scheduling,
      name: '数据治理',
      meta: {
        title: '大数据节点'
      }
    },
    //数据调度结束
  ]
})
