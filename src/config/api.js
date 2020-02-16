import fetch from './http.js';
const post='get';
const prefix='/api'
export default{
  login(params){
    return fetch(post,prefix+'/user/login',params)
  }
}
