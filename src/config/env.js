export default (function () {
    switch (process.env.VUE_APP_ENV) {
        case 'test':
            return 'http://dpapi-test.sypetro.com'
        case 'uat':
            return 'https://dpapi-uat.shengyecapital.com'
        case 'pro':
            return 'http://10.10.1.21:8888'
        default:
            // return 'http://192.168.1.43:8299' // 志华
            // return 'http://192.168.1.126:8099' // 欧阳
            return 'https://dpapi-test.syitservice.com' // 测试环境
            // return 'http://10.10.1.21:8299' // 开发环境
    }
})()