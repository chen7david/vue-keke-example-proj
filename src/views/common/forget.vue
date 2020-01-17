<template>
    <div class="forget">
        <div class="step-1" v-if="step == 1">
            <el-form ref="forgetForm1" :model="forgetForm" :rules="forgetRules" label-width="90px" @submit.native.prevent>
                <div>
                    <el-form-item prop="userName" label="用户名：">
                        <el-input v-model.trim="forgetForm.userName" placeholder="请输入用户名" :maxlength="16"></el-input>
                    </el-form-item>
                    <el-form-item prop="captchaCode" label="验证码：">
                        <el-input v-model.trim="forgetForm.captchaCode" placeholder="请输入验证码" class="input-code" :maxlength="6" auto-complete="off"></el-input>
                        <img alt="验证码" class="code-img vam" ref="imgCode" :src="imgCodeUrl" v-if="imgCodeUrl" @click="getImgCode" />
                    </el-form-item>
                    <el-form-item>
                        <button type="submit" class="btn yellow" @click="submitForm('forgetForm1', 1)">下一步</button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <el-form ref="forgetForm2" :model="forgetForm2" :rules="forgetRules2" label-width="120px" @submit.native.prevent label-position="left">
            <div class="step-2" v-if="step == 2">
                <div>
                    <el-form-item label="">
                        验证码已发送到您的手机{{mobile}}，请在下方填入
                    </el-form-item>
                    <el-form-item prop="smsCode" label="手机验证码">
                        <el-input v-model.trim="forgetForm2.smsCode" placeholder="请输入验证码" :maxlength="6">
                            <span slot="append" v-if="timeout.countdown">{{ timeout.countdown }}s</span>
                            <span slot="append" v-else @click="getCode()">获取验证码</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="userPassword">
                        <el-input type="password" v-model="forgetForm2.userPassword" :maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item label="密码确认：" prop="password2">
                        <el-input type="password" v-model="forgetForm2.password2" :maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <button id="button" type="button" class="btn border" @click="step = 1">返回</button>
                        <button id="submit" type="submit" class="btn yellow" @click="submitForm('forgetForm2', 2)">提交</button>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>

</template>

<script>

import {
    A_GET_IMGCODE
} from '@stores/common/types'
import validator from '@/common/js/plugs/validate'

export default {
    name: 'forget',
    data () {
        return {
            imgCodeUrl: '',
            step: 1,
            mobile: '',
            forgetType: 'phone',
            forgetForm: {
                userName: '',
                captchaCode: '',
                captchaKey: ''
            },
            forgetForm2: {
                smsCode: '',
                userPassword: '',
                password2: ''
            },
            forgetRules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 4, max: 16, message: '4-16个字符', trigger: 'blur' }
                ],
                captchaCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { type: 'string', min: 4, max: 6, message: '验证码输入有误', trigger: 'blur' }
                ]
            },
            forgetRules2: {
                userPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', pattern: validator.REGEXP.PASSWORD, message: '长度在 6 到 20 个字符，格式为字符+数字', trigger: 'blur' },
                    { validator: (rule, value, callback) => {
                        if (this.forgetForm.password2) {
                            this.$refs.forgetForm2.validateField('password2')
                        }
                        callback()
                    },
                    trigger: 'blur' }
                ],
                password2: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: (rule, value, callback) => {
                        if (this.forgetForm2.userPassword && value !== this.forgetForm2.userPassword) {
                            callback(new Error('两次密码不一致'))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur' }
                ],
                smsCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { type: 'string', min: 4, max: 6, message: '验证码输入有误', trigger: 'blur' }
                ]
            },

            timeout: { s: null, disabled: false, countdown: '', sendTo: '', codeId: '' }
        }
    },
    created () {
        const vm = this
        vm.getImgCode()
    },
    computed: {
    },
    methods: {
        getImgCode () {
            const vm = this
            vm.$store.dispatch(A_GET_IMGCODE).then(res => {
                vm.forgetForm.captchaKey = res.captchaKey
                vm.imgCodeUrl = res.img || ''
            })
        },
        submitForm (formName, step) {
            console.log(this.forgetForm2)
            const vm = this
            vm.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log(vm.forgetForm)
                    vm.submit(step)
                } else {
                    console.error('error submit!!')
                    return false
                }
            })
        },
        submit (step) {
            const vm = this
            const params = vm.forgetForm
            // const text = ''
            const text = `
            <p style="font-size:16px; padding-bottom:10px; color:#eb5513">
              <strong>恭喜您，密码修改成功！</strong>
            </p>
            <p>现在去登录吗？</p>`

            let
                data,
                url

            if (step === 1) {
                data = {
                    userName: params.userName,
                    captchaKey: params.captchaKey,
                    captchaCode: params.captchaCode
                }
                url = 'findPassword/verify'
            } else if (step === 2) {
                data = {
                    userName: this.forgetForm.userName,
                    userPwd: this.forgetForm2.userPassword,
                    smsCode: this.forgetForm2.smsCode
                }
                url = 'findPassword/resetPassword'
            }
            vm.$http(url, data, { isReturnMsg: true }).then((res) => {
                if (step === 1) {
                    vm.step = 2
                    vm.mobile = res.data.mobile
                    this.getCode()
                } else {
                    vm.$alert(text, '', {
                        dangerouslyUseHTMLString: true
                    }).then(() => {
                        vm.$router.push({
                            name: 'login'
                        })
                    }).catch(_ => { })
                }
            }, (err) => {
                if (step === 1) {
                    this.$message.error(err.message)
                    vm.getImgCode()
                } else if (step === 2) {
                    this.$message.error(err.message)
                }
            })
        },
        getCode () {
            const
                vm = this,
                timeout = vm.timeout

            if (timeout.disabled) return

            vm.$http('findPassword/smsCode', { userName: this.forgetForm.userName }).then((res) => {
                timeout.disabled = true
                timeout.countdown = 60
                timeout.s = setInterval(() => {
                    timeout.countdown--
                    if (timeout.countdown === 0) {
                        clearInterval(timeout.s)
                        timeout.disabled = false
                    }
                }, 1000)
            })
        }
    },
    components: {

    }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/mixin/constants';

.step-1 {
    width: 600px;
    margin: 0 auto;
}

.step-2 {
    width: 600px;
    margin: 0 auto;
}

form {
    padding: 50px 60px 50px 100px;
    // min-height: 600px;

    .el-form-item {
        >>> .el-input {
            width: 320px;

            &.input-code {
                width: 220px;
                vertical-align: middle;
            }
        }

        >>> .el-input-group__append {
            width: 115px;
            text-align: center;
            background-color: #fff;
            font-size: 14px;
            color: #F56A00;
            cursor :pointer
        }
    }

    .code-img {
        background-color: #ccc;
        height: 40px;
        width: 90px;
        display: inline-block;
        margin: 0 10px;
        border-radius: 4px;
    }

    .icon-change {
        width: 22px;
        height: @width;
    }

    .buttons {
        padding: 20px;

        .btn {
            width: 110px;
        }
    }

    .forget-type {
        overflow: hidden;
        width: 250px;
        height: 50px;
        font-size: 0;
        margin: 0 0 30px 120px;

        button {
            border: 1px #ddd solid;
            line-height: 45px;
            height: 100%;
            width: 50%;
            margin: 0;
            font-size: 16px;
            background-color: #fff;

            &:first-child {
                border-radius: 5px 0 0 5px;
                border-right-width: 0;
            }

            &:last-child {
                border-radius: 0 5px 5px 0;
                border-left-width: 0;
            }

            &.current {
                background-color: $yellow;
                color: #fff;
                border-color: $yellow;
            }
        }
    }
}
</style>
