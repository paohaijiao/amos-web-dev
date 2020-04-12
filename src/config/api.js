import axios from 'axios'
import qs from 'qs'
import common from './common'
axios.defaults.timeout = 60000;
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
                alert('登录失效')
                this.$router.push({path: "/"});


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
// export const getMailBox= (data, callback) => post(prefix+'/messageApi/mailbox', 'getMailBox', data, callback);

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
export const getDeleteUser= (data, callback) => post(prefix+'/userApi/deleteUser', 'getDeleteUser', data, callback, );
export const getUserDeleteOrUpdate= (data, callback) => post(prefix+'/userApi/createOrUpdate', 'getUserDeleteOrUpdate', data, callback, );
export const getSelectDropDown= (data, callback) => post(prefix+'/role/selectDropDown', 'getSelectDropDown', data, callback, );
export const getAuditUser= (data, callback) => post(prefix+'/userApi/auditUser', 'getAuditUser', data, callback, );
export const getSaveMenu= (data, callback) => post(prefix+'/menu/saveMenu', 'getSaveMenu', data, callback, );
export const getSelectMenuAll= (data, callback) => post(prefix+'/menu/selectMenuAll', 'getSaveMenu', data, callback, );
export const getSelectRoleAll= (data, callback) => post(prefix+'/role/selectRoleAll', 'getSelectRoleAll', data, callback, );
export const getSaveRole= (data, callback) => post(prefix+'/role/saveRole', 'getSaveRole', data, callback, );
export const getTreeView= (data, callback) => post(prefix+'/menu/treeView', 'getTreeView', data, callback, );
export const getDeleteRole= (data, callback) => post(prefix+'/role/deleteRole', 'getDeleteRole', data, callback, );
export const getSaveRoleMenu= (data, callback) => post(prefix+'/role/saveRoleMenu', 'getSaveRoleMenu', data, callback, );
export const getDataApplyList= (data, callback) => post(prefix+'/dataService/getDataApplyList', 'getDataApplyList', data, callback, );
export const getKeyPairList= (data, callback) => post(prefix+'/keyPair/getKeyPairList', 'getKeyPairList', data, callback, );
export const batchGenerateKeyPair= (data, callback) => post(prefix+'/keyPair/batchGenerateKeyPair', 'batchGenerateKeyPair', data, callback, );
export const getInterfaceMaintainList= (data, callback) => post(prefix+'/interfaceMaintain/getInterfaceMaintainList', 'getInterfaceMaintainList', data, callback, );
export const getSaveInterfaceMaintain= (data, callback) => post(prefix+'/interfaceMaintain/saveInterfaceMaintain', 'getSaveInterfaceMaintain', data, callback, );
export const getSelectInterfaceApply= (data, callback) => post(prefix+'/dataService/selectInterfaceApply', 'getSelectInterfaceApply', data, callback, );
export const getSaveDataApply= (data, callback) => post(prefix+'/dataService/saveDataApply', 'getSaveDataApply', data, callback, );
export const getPendingReviewList= (data, callback) => post(prefix+'/review/getPendingReviewList', 'getPendingReviewList', data, callback, );
export const getUpdateDataApply= (data, callback) => post(prefix+'/review/updateDataApply', 'getUpdateDataApply', data, callback, );
export const getMakeGenericDataSource= (data, callback) => post(prefix+'/genericDataSourceApi/makeGenericDataSource', 'getMakeGenericDataSource', data, callback, );
export const getGenericDataSourceList= (data, callback) => post(prefix+'/genericDataSourceApi/getGenericDataSourceList', 'getGenericDataSourceList', data, callback, );
export const getDeleteDataSource= (data, callback) => post(prefix+'/genericDataSourceApi/deleteDataSource', 'deleteDataSource', data, callback, );
export const getSql= (data, callback) => post(prefix+'/preview/sql', 'getSql', data, callback, );
export const getPreview= (data, callback) => post(prefix+'/kettlePreview/preview', 'getPreview', data, callback, );
export const getStepByTransId= (data, callback) => post(prefix+'/kettlePreview/getStepByTransId', 'getStepByTransId', data, callback, );
export const getExport= (data, callback) => post(prefix+'/exportApi/export', 'getExport', data, callback, );
export const getImport= (data, callback) => post(prefix+'/exportApi/import', 'getImport', data, callback, );
export const getJsonOperateType= (data, callback) => post(prefix+'/kettleApi/jsonOperateType', 'getJsonOperateType', data, callback, );
export const getApplicationType= (data, callback) => post(prefix+'/kettleApi/applicationType', 'getApplicationType', data, callback, );
export const getGroupType= (data, callback) => post(prefix+'/kettleApi/groupType', 'getGroupType', data, callback, );
export const getCompareType= (data, callback) => post(prefix+'/kettleApi/compareType', 'getCompareType', data, callback, );
export const getJoinType= (data, callback) => post(prefix+'/kettleApi/joinType', 'getJoinType', data, callback, );
export const getElasticSearchPreview= (data, callback) => post(prefix+'/elasticSearchApi/elasticSearchPreview', 'getElasticSearchPreview', data, callback, );
export const getFieldFromPreviousStep= (data, callback) => post(prefix+'/kettlePreview/getFieldFromPreviousStep', 'getFieldFromPreviousStep', data, callback, );
export const getLogout= (data, callback) => post(prefix+'/user/logout', 'getLogout', data, callback, );
export const getLog= (data, callback) => post(prefix+'/logApi/getLog', 'getLog', data, callback, );
export const getLogType= (data, callback) => post(prefix+'/logApi/getLogType', 'getLogType', data, callback, );
export const getDataType= (data, callback) => post(prefix+'/kettleApi/dataType', 'getDataType', data, callback, );
export const getArgDirection= (data, callback) => post(prefix+'/kettleApi/argDirection', 'getArgDirection', data, callback, );
export const getMongoOperateType= (data, callback) => post(prefix+'/kettleApi/mongoOperateType', 'getMongoOperateType', data, callback, );
export const getPoliceType= (data, callback) => post(prefix+'/kettleApi/policeType', 'getPoliceType', data, callback, );
export const getKettleTreeView= (data, callback) => post(prefix+'/directoryApi/treeView', 'getKettleTreeView', data, callback, );
export const getTreeViewFolder= (data, callback) => post(prefix+'/directoryApi/treeViewFolder', 'getTreeViewFolder', data, callback, );
export const getAddFolder= (data, callback) => post(prefix+'/directoryApi/addFolder', 'getAddFolder', data, callback, );
export const updateFolder= (data, callback) => post(prefix+'/directoryApi/updateFolder', 'updateFolder', data, callback, );
export const updateTransDir= (data, callback) => post(prefix+'/directoryApi/updateTransDir', 'updateTransDir', data, callback, );
export const updateJobDir= (data, callback) => post(prefix+'/directoryApi/updateJobDir', 'updateJobDir', data, callback, );
export const nodeType= (data, callback) => post(prefix+'/kettleApi/nodeType', 'nodeType', data, callback, );
export const resultType= (data, callback) => post(prefix+'/kettleApi/resultType', 'resultType', data, callback, );
export const scaleType= (data, callback) => post(prefix+'/kettleApi/scaleType', 'scaleType', data, callback, );
export const orcType= (data, callback) => post(prefix+'/kettleApi/orcType', 'orcType', data, callback, );
export const xmlType= (data, callback) => post(prefix+'/kettleApi/xmlType', 'xmlType', data, callback, );
export const rSlaveFindAll= (data, callback) => post(prefix+'/rSlaveApi/findAll', 'rSlaveFindAll', data, callback, );
export const rSlaveSave= (data, callback) => post(prefix+'/rSlaveApi/createOrUpdate', 'rSlaveSave', data, callback, );
export const rSlaveDelete= (data, callback) => post(prefix+'/rSlaveApi/delete', 'rSlaveDelete', data, callback, );
export const findNode= (data, callback) => post(prefix+'/rSlaveApi/findNode', 'findNode', data, callback, );
export const clusterSave= (data, callback) => post(prefix+'/clusterApi/createOrUpdate', 'clusterSave', data, callback, );
export const clusterFindAll= (data, callback) => post(prefix+'/clusterApi/findAll', 'clusterFindAll', data, callback, );
export const clusterDelete= (data, callback) => post(prefix+'/clusterApi/delete', 'clusterDelete', data, callback, );
export const rClusterSlaveSave= (data, callback) => sendPost(prefix+'/rClusterSlave/createOrUpdate',  data, {},callback);
export const partitionSave= (data, callback) => post(prefix+'/rPartitionSchemaApi/createOrUpdate', 'partitionSave', data, callback, );
export const partitionList= (data, callback) => post(prefix+'/rPartitionSchemaApi/findAll', 'partitionList', data, callback, );
export const partitionDelete= (data, callback) => post(prefix+'/rPartitionSchemaApi/delete', 'partitionDelete', data, callback, );
export const getSavePartition= (data, callback) => sendPost(prefix+'/rPartitionSchemaApi/savePartition',data,{}, callback );
export const getPartition= (data, callback) => post(prefix+'/rPartitionSchemaApi/getPartition', 'getPartition', data, callback, );
export const getClusterNotPage= (data, callback) => post(prefix+'/clusterApi/getClusterNotPage', 'getClusterNotPage', data, callback, );
export const getPartionType= (data, callback) => post(prefix+'/kettleApi/partionType', 'partionType', data, callback, );
export const getPartitionNode= (data, callback) => post(prefix+'/rPartitionSchemaApi/getPartitionNode', 'getPartitionNode', data, callback, );
export const updateTransStatus= (data, callback) => post(prefix+'/dataAdminPlatform/updateTransStatus', 'updateTransStatus', data, callback, );
