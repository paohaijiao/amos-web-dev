import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import * as Api from './config/api'
import Common from './config/common'
import {Alert, Confirm, Toast, Loading} from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.prototype.$api = Api
Vue.prototype.GLOBAL = Common
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.qs = qs
import Echarts from 'echarts'
Vue.prototype.echarts = Echarts
Vue.use(Echarts)
Vue.config.productionTip = false
Vue.use(Alert)
Vue.use(Confirm)
Vue.use(Toast, 3000)
Vue.use(Loading)
import Pagination from 'vue-pagination-2'
Vue.component('pagination', Pagination)
Vue.filter('formatDate', function(datestr) {
  if (!datestr) {
    return ''
  } else {
    let timestamp = new Date(datestr).getTime()
    let date = new Date(timestamp)
    let YY = date.getFullYear() + '-'
    let MM =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-'
    let DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let hh =
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let mm =
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return YY + MM + DD + ' ' + hh + mm + ss
  }
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
