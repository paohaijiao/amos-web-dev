import axios from 'axios'
import qs from 'qs'
import common from './common'
import {
    host, apiUrl
} from './serviceUrl'
let methodToken='';
const submitImg=(url,formData,callback)=>{
  axios.post(url,formData,'form-data')
    .then(res => {
      debugger;
      callback(res.data)
    });
}
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
    sendPost(apiUrl + url, postStr, config, callback);
}
const sendPost = (url, data, config = {}, callback) => {
    if (Object.keys(config).length) {
    }
    axios.post(url, data, config).then(response => {
        const headers = response.headers
        if (headers['content-type'] === 'application/octet-stream;charset=utf-8') {
            console.log("headers",headers)
            return response.data
        }
        if (Object.keys(config).length) {
        }
        if (200 != response.data.code) {
            console.log("接口错误:" + url,response)
            if (response.data.code === '300005' || response.data.code === 300005) {
                console.log("登录失效")
                this.$router.push({path: "/"});
              this.$alert('登录失效')
            }
            if (response.data.code === '403' || response.data.code === 403) {
                common.errorToBack(response.data.message)
                console.log("登录 403")
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
let prefix='/api'
export const getUserLogin = (data, callback) => post(prefix+'/user/login', 'getUserLogin', data, callback);
export const getRegister = (data, callback) => post(prefix+'/publicApi/register', 'getRegister', data, callback);
export const getUpload = (formdata, callback) => submitImg(prefix+'/publicApi/upload',  formdata, callback);
export const getLocation = (data, callback) => post(prefix+'/publicApi/getLocation', 'getLocation', data, callback);
export const getServerPerform = (data, callback) => post(prefix+'/indexApi/serverPerform', 'getServerPerform', data, callback);
export const getIndex= (data, callback) => post(prefix+'/indexApi/index', 'getIndex', data, callback);
export const getMailBox= (data, callback) => post(prefix+'/messageApi/mailbox', 'getMailBox', data, callback);
export const getNotify= (data, callback) => post(prefix+'/indexApi/notify', 'getNotify', data, callback);
export const getUserAll= (data, callback) => post(prefix+'/userApi/selectUserAll', 'getUserAll', data, callback);
export const getDatabaseType= (data, callback) => post(prefix+'/dataSourceApi/listDatabaseType', 'getDatabaseType', data, callback);
export const getListDatabase= (data, callback) => post(prefix+'/dataSourceApi/listDatabase', 'getListDatabase', data, callback);
export const getDeleteDatabase= (data, callback) => post(prefix+'/dataSourceApi/delete', 'getDeleteDatabase', data, callback);
export const getListAllDatabase= (data, callback) => post(prefix+'/dataSourceApi/listAllDatabase', 'getListAllDatabase', data, callback);
export const getCreateOrUpdate= (data, callback) => post(prefix+'/dataSourceApi/createOrUpdate', 'getCreateOrUpdate', data, callback);
export const getGatherSave= (data, callback) => post(prefix+'/dataSourceApi/gatherSave', 'getGatherSave', data, callback);
export const getGatherList= (data, callback) => post(prefix+'/dataSourceApi/gatherList', 'getGatherList', data, callback);
export const getGatherDelete= (data, callback) => post(prefix+'/dataSourceApi/deleteById', 'getGatherDelete', data, callback);
export const getMakeHadoopCluster= (data, callback) => post(prefix+'/dataAdminPlatform/makeHadoopCluster', 'getMakeHadoopCluster', data, callback);
export const getHadoopCluster= (data, callback) => post(prefix+'/dataAdminPlatform/getHadoopCluster', 'getHadoopCluster', data, callback);
export const getListTaskType= (data, callback) => post(prefix+'/sysTaskConfigApi/listTaskType', 'getListTaskType', data, callback);
export const getTaskConfigCreateOrUpdate= (data, callback) => post(prefix+'/sysTaskConfigApi/createOrUpdate', 'getTaskConfigCreateOrUpdate', data, callback);
export const getTaskConfigList= (data, callback) => post(prefix+'/sysTaskConfigApi/taskList', 'getTaskConfigList', data, callback);
export const getListTask= (data, callback) => post(prefix+'/sysTaskConfigApi/listTask', 'getListTask', data, callback);
export const getTaskDelete= (data, callback) => post(prefix+'/sysTaskConfigApi/deleteTask', 'getTaskDelete', data, callback);
export const getExecTask= (data, callback) => post(prefix+'/sysTaskConfigApi/execTask', 'getExecTask', data, callback);
export const getCreateTrans= (data, callback) => sendPost(prefix+'/dataAdminPlatform/createOrUpdate',  data, {},callback);
export const getTransMenuList= (data, callback) => post(prefix+'/dataAdminPlatform/getMenuList', 'getTransMenuList', data, callback, );
export const getTransById= (data, callback) => post(prefix+'/dataAdminPlatform/getTransById', 'getTransById', data, callback, );
export const getTransList= (data, callback) => post(prefix+'/dataAdminPlatform/getTransList', 'getTransList', data, callback, );
export const getDeleteTransById= (data, callback) => post(prefix+'/dataAdminPlatform/deleteTransById', 'getDeleteTransById', data, callback, );
export const getTransDataType= (data, callback) => post(prefix+'/dataAdminPlatform/getDataType', 'getTransDataType', data, callback, );
export const getRrandomType= (data, callback) => post(prefix+'/kettleApi/randomType', 'getRrandomType', data, callback, );
export const getCalcTypee= (data, callback) => post(prefix+'/kettleApi/calcType', 'getCalcTypee', data, callback, );
export const getListAllDatabaseNotPage= (data, callback) => post(prefix+'/dataAdminPlatform/listAllDatabase', 'getListAllDatabaseNotPage', data, callback, );
export const getFileType= (data, callback) => post(prefix+'/kettleApi/filetype', 'getFileType', data, callback, );
export const getVariableType= (data, callback) => post(prefix+'/kettleApi/variableType', 'getVariableType', data, callback, );
export const getJobType= (data, callback) => post(prefix+'/kettleJobApi/getJobType', 'getJobType', data, callback, );
export const getJobById= (data, callback) => post(prefix+'/kettleJobApi/getJobById', 'getJobById', data, callback, );
export const getLogLevel= (data, callback) => post(prefix+'/kettleJobApi/getLogLevel', 'getLogLevel', data, callback, );
export const makeKettleJob= (data, callback) => sendPost(prefix+'/kettleJobApi/makeKettleJob',  data, {},callback);
export const getJobList= (data, callback) => post(prefix+'/kettleJobApi/getJobList', 'getJobList', data, callback, );
export const getDeleteKettleJob= (data, callback) => post(prefix+'/kettleJobApi/deleteJob', 'getDeleteKettleJob', data, callback, );
export const getExportType= (data, callback) => post(prefix+'/kettleJobApi/exportType', 'getExportType', data, callback, );
export const getStepLogList= (data, callback) => post(prefix+'/taskManager/getStepLogList', 'getStepLogList', data, callback, );
export const getTransLogList= (data, callback) => post(prefix+'/taskManager/getTransLogList', 'getTransLogList', data, callback, );
export const getJobLog= (data, callback) => post(prefix+'/jobLogApi/getJobLog', 'getJobLog', data, callback, );
export const getJobItemLog= (data, callback) => post(prefix+'/jobLogApi/getJobItemLog', 'getJobItemLog', data, callback, );
export const getSparkJobLogList= (data, callback) => post(prefix+'/taskManager/getSparkJobLogList', 'getSparkJobLogList', data, callback, );
