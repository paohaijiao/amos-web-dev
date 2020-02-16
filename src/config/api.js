import axios from 'axios'
import qs from 'qs'
import common from './common'
import {
    host, apiUrl
} from './serviceUrl'

// 需要登陆的，都写到这里，否则就是不需要登陆的接口
let methodToken = [

]

const download = (url, method, data, callback, config = {}) => {
    let postStr = qs.stringify(data)
    url = url + "?" + postStr;
    window.open(url);
}
// 接口token验证
const post = (url, method, data, callback, config = {}) => {
    // 如果是需要登陆的，增加token
    if (methodToken.indexOf(method) >= 0) {
        let userToken = common.getStorage('tokenDing')
        if (!userToken) {
            common.jumpToLogin()
            return false
        } else {
            data.token = userToken
        }
    }
    let postStr = "";


    if (typeof(data) == 'string')
    {
        postStr = data;
    }
    else
    {
        postStr = qs.stringify(data)
    }
    //data.method = method;

    console.log(apiUrl + url, typeof(data),postStr)
    sendPost(apiUrl + url, postStr, config, callback);
}

// axios 发送请求统一处理
const sendPost = (url, data, config = {}, callback) => {

    if (Object.keys(config).length) {
        // _this.$dialog.loading.open('上传中...')
    }

    //this.$dialog.loading.open('数据加载中...')
    axios.post(url, data, config).then(response => {

        const headers = response.headers
        if (headers['content-type'] === 'application/octet-stream;charset=utf-8') {

            console.log("headers",headers)

            return response.data
        }
        //console.log(response.headers)
        if (Object.keys(config).length) {
            // _this.$dialog.loading.close()
        }
        //this.$dialog.loading.close()
        // _this.$dialog.loading.close()
        if (200 != response.data.code) {
            // 输出错误显示
            //common.errorToBack("接口"+url+" "+response.data.message)
            console.log("接口错误:" + url,response)
            if (response.data.code === '300005' || response.data.code === 300005) {
                // 用户未登录或者token过期 清空本地user_token
                //common.removeStorage('user_token')
                // 跳转至登录
                console.log("登录失效")
                common.jumpToLogin()
            }
            if (response.data.code === '403' || response.data.code === 403) {
                // 用户未登录或者token过期 清空本地user_token
                //common.removeStorage('user_token')
                // 跳转至登录
                common.errorToBack(response.data.message)
                console.log("登录 403")
                //common.jumpToLogin()
            }
        }

        if (response.data.user_token)
        {
            common.setStorage('user_token', response.data.user_token)
        }
        callback(response.data)
    }).catch(err => {
        if (err && err.response) {
            console.log("接口错误:" + url, err)

            switch (err.response.status) {
                case 400:
                    err.message = '请求参数错误'
                    break
                case 401:
                    err.message = '未授权，请登录'
                    break
                case 403:
                    err.message = '跨域拒绝访问'
                    break
                case 404:
                    err.message = `请求地址出错: ${err.response.config.url}`
                    break
                case 408:
                    err.message = '请求超时'
                    break
                case 500:
                    err.message = '服务器内部错误'
                    break
                case 501:
                    err.message = '服务未实现'
                    break
                case 502:
                    err.message = '网关错误'
                    break
                case 503:
                    err.message = '服务不可用'
                    break
                case 504:
                    err.message = '网关超时'
                    break
                case 505:
                    err.message = 'HTTP版本不受支持'
                    break
                default:
                    break
            }
            // _this.$dialog.loading.close()
            //common.errorToBack(err.message)
        }
    })
}
// 接口token验证
const get = (url,method, data, callback) => {
    // 如果是需要登陆的，增加token
    if (methodToken.indexOf(method) >= 0) {
        let userToken = common.getStorage('tokenDing')
        if (!userToken) {
            common.jumpToLogin()
            return false
        } else {
            data.token = userToken
        }
    }
    data.method = method;
    sendGet(apiUrl + url, qs.stringify(data), {}, callback);
}
const sendGet = (url, data, config = {}, callback) => {


    axios.get(url, data, config).then(response => {

        console.log(response)

        if (Object.keys(config).length) {
            // _this.$dialog.loading.close()
        }
        // _this.$dialog.loading.close()
        if (200 != response.data.code) {
            // 输出错误显示
            common.errorToBack(response.data.message)
            if (response.data.data === 14007 || response.data.data === 14006) {
                // 用户未登录或者token过期 清空本地user_token
                common.removeStorage('user_token')
                // 跳转至登录
                common.jumpToLogin()
            }
        }

        if (response.data.user_token) {
            common.setStorage('user_token', response.data.user_token)
        }
        callback(response.data)
    }).catch(err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '请求参数错误'
                    break
                case 401:
                    err.message = '未授权，请登录'
                    break
                case 403:
                    err.message = '跨域拒绝访问'
                    break
                case 404:
                    err.message = `请求地址出错: ${err.response.config.url}`
                    break
                case 408:
                    err.message = '请求超时'
                    break
                case 500:
                    err.message = '服务器内部错误'
                    break
                case 501:
                    err.message = '服务未实现'
                    break
                case 502:
                    err.message = '网关错误'
                    break
                case 503:
                    err.message = '服务不可用'
                    break
                case 504:
                    err.message = '网关超时'
                    break
                case 505:
                    err.message = 'HTTP版本不受支持'
                    break
                default:
                    break
            }
            // _this.$dialog.loading.close()
            common.errorToBack(err.message)
        }
    })
}

// 图片上传
export const uploadFile = (data, callback) => {
    data.append('method', 'images.upload')
    let param = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
    sendPost(apiUrl, data, param, callback)
}


// 登录
export const getUserLogin = (data, callback) => post('/api/user/login', 'getUserLogin', data, callback);
