import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Dash from '@/components/Dash'
import collectionIndex from '@/components/collection/index'
import collectionData from '@/components/collection/collection-data'
import hadoopCluster from '@/components/collection/hadoop-cluster'
import scheduling from '@/components/scheduling/scheduling'

import governance from '@/components/governance/index.vue'
import transList from '@/components/governance/trans.vue'
import jobList from '@/components/governance/job_list.vue'
import job from '@/components/governance/job.vue'

import transLog from '@/components/monitor/translate'
import stepLog from '@/components/monitor/step'
import jobLog from '@/components/monitor/joblog'
import jobItemLog from '@/components/monitor/jobitemlog'
import SparkLog from '@/components/monitor/Spark'
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
    //数据治理开始
    {
      path: '/index/governance',
      name: '数据治理',
      meta: {
        title: '转换'
      },
      component: governance,
    },
    {
      path: '/index/trans',
      name: '数据治理',
      meta: {
        title: '转换列表'
      },
      component: transList
    },
    {
      path: '/index/job',
      name: '数据治理',
      meta: {
        title: '作业'
      },
      component: job
    },

    {
      path: '/index/job_list',
      name: '数据治理',
      meta: {
        title: '作业列表'
      },
      component: jobList
    },
    //数据治理结束
    //任务监控开始
    {
      path: '/index/translate',
      component: transLog,
      name: '数据治理',
      meta: {
        title: '转换日志'
      }
    },
    {
      path: '/index/step',
      component: stepLog,
      name: '数据治理',
      meta: {
        title: '步骤日志'
      }
    },
    {
      path: '/index/joblog',
      component: jobLog,
      name: '数据治理',
      meta: {
        title: '步骤日志'
      }
    },
    {
      path: '/index/Spark',
      component: SparkLog,
      name: '数据治理',
      meta: {
        title: 'Spark日志'
      }
    },


    {
      path: '/index/jobitemlog',
      component: jobItemLog,
      name: '数据治理',
      meta: {
        title: '作业项日志'
      }
    }

    //任务监控结束
  ]
})
