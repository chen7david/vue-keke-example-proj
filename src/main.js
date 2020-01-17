// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import {
    sync
} from 'vuex-router-sync'
import App from './App'
import mixin from '@/common/js/mixins'
import ElementUI from 'element-ui';
import request from './config'
import 'element-ui/lib/theme-chalk/index.css'

// 加载公共样式
import './assets/css/app.styl'

Vue.use(ElementUI);

Vue.prototype.$http = request


Vue.prototype.$ELEMENT = {
    size: 'medium'
}

const strict = process.env.NODE_ENV !== 'production'

Vue.config.productionTip = false

// 加载路由
let routes = [];
(r => {
    r.keys().forEach(key => {
        let mod = r(key)
        let data = mod.__esModule && mod.default ? mod.default : mod
        routes.push(...data)
    })
})(require.context('./routers', false, /^\.\/.*\.js$/))

Vue.use(Router)
const router = new Router({
    strict: strict,
    routes: routes,
    mode: 'history',
    base: '/'
})

// 加载vuex
const modules = {};
(r => {
    r.keys().forEach(key => {
        let mod = r(key),
            data = (mod.__esModule && mod.default) ? mod.default : mod
        modules[key.slice(2, -9)] = data
    })
})(require.context('./stores', true, /^\.\/.*\/index\.js$/))

Vue.use(Vuex)
const store = new Vuex.Store({
    modules,
    strict: strict // 产品环境下不能启用严格模式
})
sync(store, router)

Vue.mixin(mixin)
/* eslint-disable no-new */
new Vue({
    router,
    store,
    template: '<App/>',
    created() {},
    mounted() {},
    components: {
        App
    }
}).$mount('#app')

// 生产环境关闭调试信息
const NODE_ENV = process.env.VUE_APP_API;
(NODE_ENV === 'production') && (console.log = console.info = console.error = console.warn = function () {})