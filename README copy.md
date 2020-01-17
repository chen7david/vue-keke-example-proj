建议使用 cnpm

cnpm
\$ npm install -g cnpm --registry=https://registry.npm.taobao.org

````

```bash
# 初始化项目，添加依赖
cnpm install

# 启动本地服务 localhost:8080
npm start
npm run serve-t(调用测试环境接口)
npm run serve-p(调用生产环境接口)

# 打包生产环境代码
npm run build

# 打包正式测试环境代码
npm run build-t

# 打包开发测试环境代码
npm run build-d

# build for production and view the bundle analyzer report
npm run build --report


````

## Convenient

- [x] 静态词典和参数配置文件 src/common/js/config.js
- [x] 全局混合 src/common/js/mixin.js 下的所有的 function 和 mixin
- [x] autoprefixer 自动补全适配浏览器的前缀，如：-webkit-、-moz-
- [x] 修改服务端代码自动重启
- [x] 修改客户端代码自动同步到浏览器，小范围修改不会刷新页面

## 发送请求 默认是 post

```bash
this.$http(url,params,config).then().catch()
```

- url 请求地址
- params 请求参数 默认不传为{}
- config={ // 配置
  isToken: true, // 接口是否需要 token
  isLoginPage: false, //是否登陆页面，注册页面，350 时候不跳转到登陆页面
  isReturnMsg: false //是否需要 catch 错误信息，默认为 false 统一处理，toast 提示
  }

get 请求

```bash
this.$http('/demoUrl',params,{type:'get'}).then().catch()
```

post 请求 json 格式（默认）

```bash
this.$http('/demoUrl',params).then().catch()
```

post 请求 formDate 格式

```bash
this.$http('/demoUrl',params,{type:'formdata'}).then().catch()
```

post 请求 上传文件格式

```bash
this.$http('/uploadFile', { params: data, file: { file: fileData // 通过 van-uploader 获取的文件 }, { isReturnMsg: true, type: 'upload'}).then().catch()
`
```

本地存储使用 "si-store"

使用方法 https://www.npmjs.com/package/si-store

store.set('test1', 'this is value') // 存储字符串
store.set('test2', {
key: 'this is test'
}) // 也可以存储对象

store.get('test1') // 获取存储的值 this is value

store.remove('test2')
