import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Dash from '@/components/Dash'
import collectionIndex from '@/components/collection/index'
import collectionData from '@/components/collection/collection-data'
import hadoopCluster from '@/components/collection/hadoop-cluster'
import generic from '@/components/collection/generic'
import scheduling from '@/components/scheduling/scheduling'

import governance from '@/components/governance/index.vue'
import transList from '@/components/governance/trans.vue'
import jobList from '@/components/governance/job_list.vue'
import job from '@/components/governance/job.vue'
import users from '@/components/system/users'
import menus from '@/components/system/menus'
import character from '@/components/system/character'
import transLog from '@/components/monitor/translate'
import stepLog from '@/components/monitor/step'
import jobLog from '@/components/monitor/joblog'
import jobItemLog from '@/components/monitor/jobitemlog'
import SparkLog from '@/components/monitor/Spark'

import dataapply from '@/components/service/dataapply'
import interfacemaintain from '@/components/service/interfacemaintain'
import invokeLog from '@/components/service/invokeLog'
import keymanagement from '@/components/service/keymanagement'

import dataservice from '@/components/review/dataservice.vue'
import registerAudit from '@/components/review/registerAudit.vue'
import sql from '@/components/preview/sql'
import steppreview from '@/components/preview/step-preview'
import exportrepository from '@/components/repository/export-repository.vue'
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
    {
      path: '/index/index1',
      name: '主页',
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
      path: '/index/generic',
      component: generic,
      name: '数据治理',
      meta: {
        title: '通用数据源节点'
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
    },

    //任务监控结束
    //系统管理开始
    {
      path: '/index/users',
      component: users,
      name: '数据治理',
      meta: {
        title: '用户管理'
      }
    },
    {
      path: '/index/character',
      component: character,
      name: '数据治理',
      meta: {
        title: '用户管理'
      }
    },
    {
      path: '/index/menus',
      component: menus,
      name: '数据治理',
      meta: {
        title: '菜单管理'
      }
    },
    //系统管理结束
    {
      path: '/index/dataservice',
      name: '数据治理',
      meta: {
        title: '接口审核'
      },
      component: dataservice
    },
    {
      path: '/index/registerAutdit',
      name: '数据治理',
      meta: {
        title: '注册审核'
      },
      component: registerAudit
    },
    //数据服务开始
    {
      path: '/index/dataapply',
      component: dataapply,
      name: '数据治理',
      meta: {
        title: '数据申请'
      }
    },
    {
      path: '/index/interfacemaintain',
      component: interfacemaintain,
      name: '数据治理',
      meta: {
        title: '接口维护'
      }
    },
    {
      path: '/index/invokeLog',
      component: invokeLog,
      name: '数据治理',
      meta: {
        title: '调用日志'
      }
    },
    {
      path: '/index/keymanagement',
      component: keymanagement,
      name: '数据治理',
      meta: {
        title: '秘钥管理'
      }
    },


    //数据服务结束
    //数据预览开始
    {
      path: '/index/sql-preview',
      component: sql,
      name: '数据治理',
      meta: {
        title: '数据查询'
      }
    },
    {
      path: '/index/step-preview',
      component: steppreview,
      name: '数据治理',
      meta: {
        title: '步骤预览'
      }
    },


    //数据预览结束
    {
      path: '/index/export-repository',
      component: exportrepository,
      name: '数据治理',
      meta: {
        title: '导出资源库'
      }
    },


  ]
})
