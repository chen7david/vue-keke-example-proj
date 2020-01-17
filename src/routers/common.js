'use strict'

const routes = []
// 首页
routes.push({
        path: '*',
        name: 'page-404',
        meta: {
            title: '404未找到'
        },
        component: () => import('@views/common/404')
    }, {
        path: '/',
        redirect: {
            name: 'index'
        }
    }, {
        path: '/index',
        name: 'index',
        component: () => import('@views/index')
    },
    // 登录 && 注册
    {
        path: '/login',
        name: 'login',
        component: () => import('@views/login/login')
    },
    // 新注册流程
    {
        path: '/register',
        name: 'register',
        component: () => import('@views/login/register')
    }, {
        path: '/forget',
        name: 'forget',
        component: () => import('@views/login/register')
    }, {
        path: '/change-pwd',
        name: 'change-pwd',
        component: () => import('@views/common/change-pwd')
    }, {
        path: '/login-tips',
        name: 'login-tips',
        component: () => import('@views/common/login-tips')
    }
)


export default routes