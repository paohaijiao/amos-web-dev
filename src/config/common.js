

// 设置localStorage
function setStorage (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

// 获取localStorage
function getStorage (name) {
    if (!name) return
    return window.localStorage.getItem(name)
}

// 删除localStorage
function removeStorage (name) {
    if (!name) return
    window.localStorage.removeItem(name)
}

// 把obj对象里的值覆盖到newobj里面
function deepCopy (newobj, obj) {
    if (typeof obj !== 'object') {
        return obj
    }
    for (let attr in obj) {
        let a = {}
        if (newobj[attr]) {
            a = newobj[attr]
        }
        newobj[attr] = deepCopy(a, obj[attr])
    }
    return newobj
}

// 跳转到登陆页面
function jumpToLogin () {
    _this.$router.push({
        path: '/',

    })
}

// 当出错的时候，显示错误信息，并且跳转
function errorToBack (msg = '出错了，请重试', time = 1500) {
  _this.$alert(msg,'请求数据错误', {
    confirmButtonText: '确定',
    callback: action => {

    }
  });
}
// 操作成功后，的提示信息
function successToShow (msg = '保存成功', callback = function () {}) {
    // wx.showToast({
    //   title: msg,
    //   icon: 'success',
    //   duration: 2000,
    // });
    // setTimeout(function () {
    //   callback();
    // }, 1500)
}

// 时间戳转时间格式
function timeToDate (date) {
    let dateTime = new Date(date * 1000) // 如果date为13位不需要乘1000
    let Y = dateTime.getFullYear() + '-'
    let M = (dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1) + '-'
    let D = (dateTime.getDate() < 10 ? '0' + (dateTime.getDate()) : dateTime.getDate()) + ' '
    let h = (dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()) + ':'
    let m = (dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes()) + ':'
    let s = (dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds())
    return Y + M + D + h + m + s
}

// 货币格式化
function formatMoney (number, places, symbol, thousand, decimal) {
    number = number || 0
    places = !isNaN(places = Math.abs(places)) ? places : 2
    symbol = symbol !== undefined ? symbol : '￥'
    thousand = thousand || ','
    decimal = decimal || '.'
    let negative = number < 0 ? '-' : ''
    let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
    let j = (i.length) > 3 ? i.length % 3 : 0
    return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
}

function throttle (fn, context, delay) {
    clearTimeout(fn.timeoutId)
    fn.timeoutId = setTimeout(function () {
        fn.call(context)
    }, delay)
}

// 获取验证码
function getCaptcha () {
    let randomNumber = Math.random() * 10 + 1
    return window.host + '/captcha?' + randomNumber
}

function hecong () {
    // 测试环境
    let entId
    if (process.env.NODE_ENV === 'development') {
        entId = '10519'
    } else if (process.env.NODE_ENV === 'production') {
        // 正式环境
        entId = window.entId
    }
    return entId
}

function locationHost () {
    if (process.env.NODE_ENV === 'production') {
        return window.host
    } else {
        return ''
    }
}

function isWeiXinBrowser () {
    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    let ua = window.navigator.userAgent.toLowerCase()
    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else {
        return false
    }
}

function wxRegister(callback) {
    let reqUrl = window.location.href.split('#')[0];
    let data = { params: { reqUrl: reqUrl } }
    _this.$api.getJsSign(data, res => {
        let config = {
            debug: res.data.debug,
            appId: res.data.appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: res.data.jsApiList
        };
        console.log('config', config);
        wx.config(config);
    });
    wx.ready((res) => {
        console.log('wx.ready', res);
        // 如果需要定制ready回调方法
        if (callback) {
            callback()
        }
    });
}

/**
 * [ShareTimeline 微信分享到朋友圈]
 * @param {[type]} opstion [分享信息]
 * @param {[type]} success [成功回调]
 * @param {[type]} error   [失败回调]
 */
function shareTimeline(opstion) {
    wx.onMenuShareTimeline({
        title: opstion.title, // 分享标题
        link: opstion.link, // 分享链接
        imgUrl: opstion.imgUrl, // 分享图标
        success() {
            // 用户成功分享后执行的回调函数
            opstion.success()
        },
        cancel() {
            // 用户取消分享后执行的回调函数
            opstion.error()
        }
    });
    wx.onMenuShareAppMessage({
        title: opstion.title, // 分享标题
        link: opstion.link, // 分享链接
        imgUrl: opstion.imgUrl, // 分享图标
        success() {
            // 用户成功分享后执行的回调函数
            opstion.success()
        },
        cancel() {
            // 用户取消分享后执行的回调函数
            opstion.error()
        }
    });

}

function TMap(key) {
    return new Promise(function (resolve, reject) {
        window.init = function () {
            resolve(qq)//注意这里
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://map.qq.com/api/js?v=2.exp&callback=init&key=" + key;
        script.onerror = reject;
        document.head.appendChild(script);
    })
};

function openLocation(opstion) {
    wx.openLocation({
        latitude: opstion.latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude: opstion.longitude, // 经度，浮点数，范围为180 ~ -180。
        name: opstion.name, // 位置名
        address: opstion.address, // 地址详情说明
        scale: opstion.scale, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: opstion.infoUrl, // 在查看位置界面底部显示的超链接,可点击跳转
        success() {
            // 用户成功分享后执行的回调函数
            opstion.success()
        },
        cancel() {
            // 用户取消分享后执行的回调函数
            opstion.error()
        }
    });
}

function getUrlKey(name) {
    return (
        decodeURIComponent(
            (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
                location.href
            ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
    );
}

export default {
    setStorage: setStorage,
    getStorage: getStorage,
    removeStorage: removeStorage,
    deepCopy: deepCopy,
    jumpToLogin: jumpToLogin,
    timeToDate: timeToDate,
    formatMoney: formatMoney,
    errorToBack: errorToBack,
    successToShow: successToShow,
    throttle: throttle,
    getCaptcha: getCaptcha,
    hecong: hecong,
    locationHost: locationHost,
    isWeiXinBrowser: isWeiXinBrowser,
    wxRegister: wxRegister,
    shareTimeline: shareTimeline,
    openLocation:openLocation,
    TMap:TMap,
    getUrlKey: getUrlKey
}
