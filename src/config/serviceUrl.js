let host = ''
let apiUrl = ''

if (process.env.NODE_ENV === 'development') {
    // 开发环境
    host = ''
    apiUrl = host + ''
    // apiUrl = 'http://wjima.ngrok.jihainet.com/api.html'
    // apiUrl = 'https://b2c.jihainet.com/api.html'
} else if (process.env.NODE_ENV === 'production') {
    // 生产环境
    //host = window.host
    host = ''
    apiUrl = host + ''
}

export {
    host,
    apiUrl
}
