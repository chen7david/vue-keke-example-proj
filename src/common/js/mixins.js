'use strict'

import store from "si-store";
import config from "./config";

export default {
    data() {
        return {
            ...config,
            userInfo: store.get('userInfo') || {},
            PHONE_PREFIX: ''
        }
    },
    created() {

    },
    computed: {},
    directives: {
        title() {}

    },
    methods: {
        // 存储用户登录基本信息
        saveLogin(data) {
            if (!data) return
            store.set("userInfo", data);
        },
        // 清空登录基本信息
        clearLogin() {
            store.remove("userInfo");
        },
        // 退出登录并跳转到登录页
        loginOut() {
            this.clearLogin()
            this.$router.push({
                name: 'login'
            })
        }
    },
    filters: {}

}