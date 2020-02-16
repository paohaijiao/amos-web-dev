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
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
