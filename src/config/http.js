import  axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'https://127.0.0.1:5001';
import Vue from 'vue'
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
// Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs
let $http=axios.create()
$http.defaults.baseURL=process.env.API //在congif  dev.env.js  prod.env.js 中设置的
//请求拦截
$http.interceptors.request.use(
  config=>{
    return config
  },
  err=>{
    return Promise.reject(err)
  }
)
//响应拦截
$http.interceptors.response.use(
  response=>{
    if(response.data.errcode==40023){
      localStorage.clear()
      this.$router.path('/login')
    }else{
      //当前还是登陆状态
    }
  }
)

//统一接口请求封装
function  fetch(method='get',url,params){
  return new Promise((resolve,reject)=>{
    $http(
      {
        url:url,
        method:method,
        data:params
      }
    ).then(res=>{
      reslove(res)
    }).catch(err=>{
      reject(err)
    })
  })
}
export  default  fetch
