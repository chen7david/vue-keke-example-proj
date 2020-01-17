'use strict'

import * as types from './types'
import env from '@/config/env'
import Fetch from '@/config/index'


export default {
    // 获取图形验证码
    [types.A_GET_IMGCODE]({
        state,
        commit
    }, param) {
        return Fetch('imgCode', param, {
            isToken: false
        }).then((res) => {
            return res.data
        })
    },
    // 获取短信验证码
    [types.A_GET_SMSCODE]({
        state,
        commit
    }, param) {
        return Fetch('register/smsCode', param).then((res) => {
            return res.data
        })
    }
}