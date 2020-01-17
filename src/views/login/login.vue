<template>
  <section class="login-main">
    <el-row class="logoinHeader">
      <el-col class="logo">
        这里是logo
      </el-col>
    </el-row>
    <el-row class="bgIcon">
    </el-row>
    <el-row class="formArea">
      <el-form ref="loginForm" :model="loginForm" :rules="rules" @submit.native.prevent>
        <div class="t txtc" v-title>欢迎登录Max的业务系统</div>
        <div class="table">
          <el-form-item prop="userName">
            <el-input v-model.trim="loginForm.userName" placeholder="请输入用户名" :maxlength="16" auto-complete="on" id="userName"
              :class="{active:activeItem=='name'}" @focus="activeItem='name'" @blur="activeItem=''">
              <i class="icon icon-user" slot="prepend"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="userPwd">
            <el-input :type="passwordType" v-model="loginForm.userPwd" placeholder="请输入密码" :maxlength="20"
              auto-complete="off" id="password" :class="{active:activeItem=='pass'}" @focus="activeItem='pass'" @blur="activeItem=''">
              <template slot="prepend">
                <i class="icon icon-password"></i>
              </template>
              <el-button class="password-btn" slot="append" v-show="loginForm.userPwd" @click="passwordType = passwordType === 'password' ? 'text': 'password'">
                <i class="icon icon-eye" :class="{close : passwordType === 'password'}"></i>
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="captchaCode">
            <el-input v-model="loginForm.captchaCode" placeholder="请输入验证码" class="input-code" :maxlength="6"
              auto-complete="off" id="imgCode" :class="{active:activeItem=='code'}" @focus="activeItem='code'" @blur="activeItem=''">
              <i class="icon icon-code" slot="prepend"></i>
            </el-input>
            <img alt="验证码" class="code-img vam" ref="imgCode" :src="imgCodeUrl" v-if="imgCodeUrl" @click="getImgCode" />
          </el-form-item>
          <el-form-item>
            <button class="m" type="submit" @click.stop="submitForm('loginForm')">登 录</button>
          </el-form-item>
        </div>
        <div class="f cf">
          <span class="l">
            <!-- <el-checkbox v-model="cacheMe" id="cacheMe" style="color:#999">记住我</el-checkbox> -->
          </span>
          <span class="r">
            <router-link :to="{name:'forget'}">忘记密码</router-link> |
            <router-link :to="{name:'register'}">注册</router-link>
          </span>
        </div>
      </el-form>
    </el-row>
    <app-footer></app-footer>
  </section>

</template>

<script>
import { A_GET_IMGCODE } from '@stores/common/types'
import store from "si-store";

// import { mapState } from 'vuex';
export default {
  name: 'login',
  data() {
    // 隐藏头部
    return {
      passwordType: 'password',
      activeItem: '',
      errorCount: 0,
      cacheMe: false,
      imgCodeUrl: '',
      loginForm: {
        userName: '',
        userPwd: '',
        captchaKey: '',
        captchaCode: '',
        systemName: 'QYD'
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            max: 20,
            message: '密码输入有误',
            trigger: 'blur'
          }
        ],
        captchaCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            type: 'string',
            min: 4,
            max: 6,
            message: '验证码输入有误',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {},
  created() {
    this.getImgCode()
    if (this.$route.query && this.$route.query.userName) {
      this.loginForm.userName = this.$route.query.userName
    }
  },
  computed: {},
  methods: {
    getImgCode() {
      this.$store.dispatch(A_GET_IMGCODE).then(res => {
        this.loginForm.captchaKey = res.captchaKey
        this.imgCodeUrl = res.img || ''
      })
    },
    submitForm(formName) {
      this.activeItem = ''
      const vm = this
      vm.$refs[formName].validate(valid => {
        if (valid) {
          // 清空token
          vm.clearLogin()
          // 发送登录请求
          // console.log(vm.loginForm)
          vm.$http('login', vm.loginForm, { isReturnMsg: true }).then(res => {
            this.saveLogin(res.data)
            this.$router.push({ name: 'index' })
          }).catch(err => {
            console.log(err)
            // 重新拉取验证码
            vm.getImgCode()
            this.$message.error(err.message)
            vm.loginError(err.data)
          })
        } else {
          console.error('error submit!!')
          return false
        }
      })
    },
    getCurrentUserInfo(data) {
      this.$http('currentUserInfo', {}, { isToken: false, isLogin: false, reSetToken: true, Authorization: data.token }).then(res => {
        let userInfo = res.data
        this.saveLogin(userInfo)
        this.$router.push({ name: 'index' })
      })
    },
    // 登录出错
    loginError(data) {
      const vm = this
      let text = '登录失败！'
      if (!data) return
    },
    toIndex(data) {
      const vm = this
      let backto = vm.$route.query.backto
      let opt = {
        name: 'index'
      }
      // 登录成功，清除登录错误信息
      store.loginErrorCount = null

      // 缓存登录信息
      vm.saveLogin(data)
      if (userName === data.userName && backto) {
        const index = backto.indexOf('/', 8)
        backto = backto.slice(index)
        opt = {
          path: backto
        }
      }
      vm.$router.push(opt)
    }
  },
  components: {
    appFooter: () => import('../common/layout/c-footer')
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/mixin/constants'; // 公共变量

$width = 460px;

.login-main {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #0a1954;

  .logoinHeader {
    width: 100%;
    height: 80px;
    background-color: #fff;
    line-height: 80px;
    padding-left: 100px;
  }

  .logo {
    width: 300px;
    height: 80px;
    // background-color: #ddd;
    text-align: center;
    // background: url('../../assets/img/logo.png') no-repeat center;
    background-size: 160px;
  }

  .bgIcon {
    width: 800px;
    height: 550px;
    // background: url('../../assets/img/loginBG.png') no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    left: 10%;
    top: 45%;
    margin-top: -225px;
  }

  .formArea {
    position: absolute;
    width: $width;
    height: 420px;
    top: 50%;
    right: 15%;
    margin-top: -210px;
    margin-left: -($width / 2);

    .smalllogo {
      position: relative;
      width: 145px;
      height: 145px;
      border-radius: 50%;
      margin-top: -72.5px;
      margin-left: 127.5px;
      background: url('../../assets/img/smalllogo.png') no-repeat center 22px;
      background-color: #fff;
      background-size: 65px 65px;
    }
  }

  form {
    display: inline-block;
    width: 100%;
    padding: 0 50px;
    padding-top: 28px;
    position: relative;
    text-align: left;
    background-color: #fff;
    background-size: auto 100%;
    top: -20px;
    border-radius: 5px;

    .t {
      line-height: 50px;
      color: #3B4966;
      font-size: 22px;
      position: relative;
      margin-bottom: 10px;
    }

    .table {
      .el-input {
        border: 1px solid #D9D9D9;
        line-height: 40px;
        height: 40px;
        overflow: hidden;

        &.active {
          border: 1px solid #FF9420;
          // background: #FFF8EC !important;
        }

        >>> .el-form-item.is-error, >>>.el-form-item.is-success {
          border: none;
        }
      }

      >>> .el-input-group__prepend, >>> .el-input-group__append {
        background-color: transparent;
        border: none;
        border-radius: 0;
      }

      >>> .el-input__inner {
        height: 35px;
        border-radius: 0;
        border: none;
        background-color: transparent;
        outline: none;
        position: relative;
        top: 3px;
        color: #333333;
        width: 99%;
        appearance: none;

        &:-webkit-autofill {
          // background-color: white !important;
          // -webkit-box-shadow: 0 0 0px 1000px white inset;
          // border-color: transparent !important;
        }

        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px white inset;
        }
      }

      .icon {
        width: 19px;
        margin: 0;
        height: 20px;
      }

      .input-code {
        width: 230px;
        vertical-align: middle;
      }

      .code-img {
        background-color: #ccc;
        height: 41px;
        width: 120px;
        display: inline-block;
        margin-left: 10px;
        border-radius: 4px;
      }

      .icon-change {
        width: 18px;
        height: @width;
      }

      >>> .el-form-item__error {
        padding-left: 62px;
      }
    }

    .m {
      display: inline-block;
      width: 100%;
      background: #FF9420;
      border-radius: 3px;
      font-size: 18px;
      color: #fff;
      // margin-top: 15px;
    }

    .f {
      height: 35px;
      line-height: 20px;
      bottom: 10px;
      width: 100%;
      padding: 0;
      text-align: center;
      font-size: 16px;

      // margin-top: -10px;
      .l {
        float: left;

        .cache {
          color: #666;
        }
      }

      .r {
        float: right;
        color: #999999;

        a {
          font-size: 14px;
          color: #999999;
        }
      }
    }
  }
}
</style>
