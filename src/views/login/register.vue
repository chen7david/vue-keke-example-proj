<template>
  <section class="login-main">
    <el-row class="logoinHeader">
      <el-col class="logo"></el-col>
    </el-row>
    <el-row class="formArea" v-if='routeName==="register"&!$route.query.from'>
      <el-row style="background:#fff">
        <div class="title">新用户注册</div>
        <div class="body-centent">
          <el-form autocomplete="on" :model="ruleForm" :rules="rules" ref="regForm" label-width="120px" label-position="left"
            class="edit-table" @submit.native.prevent inline-message>
            <el-form-item label="企业名称：" prop="customerName">
              <el-input placeholder="请输入您营业执照上的名称" v-model.trim="ruleForm.customerName" :maxlength="40"></el-input>
            </el-form-item>
            <el-form-item label="联系人姓名：" prop="contactName">
              <el-input placeholder="请输入联系人姓名" v-model.trim="ruleForm.contactName" :maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱：" prop="email">
              <el-input placeholder="请输入管理员电子邮箱" v-model.trim="ruleForm.email" :maxlength="50"></el-input>
            </el-form-item>
            <el-form-item label="联系号码" prop="mobile">
              <el-input placeholder="请输入联系人手机号" v-model.trim="ruleForm.mobile" class="input-with-select" @input="copyName">
                <el-select v-model="ruleForm.districtNumber" slot="prepend">
                  <el-option v-for="(item, k) in PHONE_PREFIX" :key="k" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item prop="smsCode" v-if="ruleForm.districtNumber&&ruleForm.mobile" label="验证码">
              <el-input v-model.trim="ruleForm.smsCode" :maxlength="6" class='input-code'>
                <c-get-code-btn @getCode="getCode('mobile')" ref="phoneCode" text="获取验证码" slot="append" class='pull-right'></c-get-code-btn>
              </el-input>
              <input type="hidden" />
            </el-form-item>
            <el-form-item label="用户名：" prop="userName">
              <el-input placeholder="不可以使用特殊字符或者中文" v-model.trim="ruleForm.userName" :maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="userPwd" class="password">
              <el-input placeholder="需包含数字和字母的组合" type="password" v-model="ruleForm.userPwd" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="密码确认：" prop="confirmPassword">
              <el-input placeholder="需包含数字和字母的组合" type="password" v-model="ruleForm.confirmPassword" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="渠道码">
              <el-input placeholder="如有渠道码，请填写" v-model.trim="ruleForm.businessSource" :maxlength="10"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox id="agree" v-model="agree" class='pull-left'>我已阅读并同意
                <a @click.stop.prevent="$refs.agree.open()">《系统软件许可及服务协议》</a>
              </el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type='primary' class="pull-left pad40" @click="saveUserInfo('regForm')" size='small'>注册</el-button>
              <!-- <router-link :to="{name:'register-new-1'}">注册</router-link> -->
            </el-form-item>
          </el-form>
        </div>
      </el-row>
    </el-row>
    <el-row class="formArea" v-if='routeName==="register-new"&$route.query.from==="yzw"'>
      <el-row style="background:#fff">
        <div class="title">新用户注册</div>
        <div class="body-centent body-centent2">
          <el-form autocomplete="on" :model="ruleForm" :rules="rules" ref="regForm" label-width="120px" label-position="left"
            class="edit-table" @submit.native.prevent>
            <el-form-item label="企业名称：">
              <el-input placeholder="请输入您营业执照上的名称" v-model.trim="ruleForm.customerName" :maxlength="40" :disabled='true'></el-input>
            </el-form-item>
            <el-form-item label="联系人姓名：">
              <el-input placeholder="请输入联系人姓名" v-model.trim="ruleForm.contactName" :maxlength="30" :disabled='true'></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱：">
              <el-input placeholder="请输入管理员电子邮箱" v-model.trim="ruleForm.email" :maxlength="50" id="email" :disabled='true'></el-input>
            </el-form-item>
            <el-form-item label="联系号码">
              <el-input placeholder="请输入联系人手机号" v-model.trim="ruleForm.mobile" class="input-with-select" @input="copyName"
                :disabled='true'>
                <el-select v-model="ruleForm.districtNumber" slot="prepend" id="districtNumber" :disabled='true'>
                  <el-option v-for="(item, k) in PHONE_PREFIX" :key="k" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="用户名：" prop="userName">
              <el-input placeholder="不可以使用特殊字符或者中文" v-model.trim="ruleForm.userName" :maxlength="16"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="userPwd" class="password">
              <el-input placeholder="需包含数字和字母的组合" type="password" v-model="ruleForm.userPwd" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="密码确认：" prop="confirmPassword">
              <el-input placeholder="需包含数字和字母的组合" type="password" v-model="ruleForm.confirmPassword" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox id="agree" v-model="agree" class='pull-left'>我已阅读并同意
                <a @click.stop.prevent="$refs.agree.open()">《系统软件许可及服务协议》</a>
              </el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button id="submit" type='primary' class="pull-left pad40" @click="saveUserInfo('regForm')" size='small'>注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-row>
    </el-row>

    <el-row class="formArea2" v-if='routeName==="forget"'>
      <div style="background:#fff">
        <div class="title">找回密码</div>
        <c-forget></c-forget>
      </div>
    </el-row>

    <!-- 注册协议 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="600px" center :close-on-click-modal='false'
      :close-on-press-escape='false' :show-close='false'>
      <p style="line-height:30px">恭喜您注册成功。您现在可以通过账号和密码进行登录，系统
        <b style='color:#F7912E;'>{{second3}} S</b> 后自动返回至登录页。</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toLogin" size='small'>立即前往登录</el-button>
      </span>
    </el-dialog>

    <app-footer></app-footer>
  </section>
</template>

<script>
import validator from '@/common/js/plugs/validate'
export default {
  name: 'register-new-2',
  data() {
    return {
      agree: true,
      dialogVisible: false,
      reduceTime: null,
      // 管理员信息
      ruleForm: {
        customerName: '',
        contactName: '',
        email: '',
        mobile: '',
        smsCode: '',
        districtNumber: '+86',
        userName: '',
        userPwd: '',
        confirmPassword: '',
        businessSource: '',
        phoneId: '1'
      },
      second3: 5,
      rules: {
        customerName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { type: 'string', min: 5, max: 40, message: '长度在 5 到 40 个字符', trigger: 'blur' },
          {            validator: (rule, value, callback) => {
              this.customerName(value).then(res => {
                callback()
              }, () => {
                callback(new Error('企业名称不存在'))
              })
            },
            trigger: 'blur'          }
        ],
        contactName: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          { type: 'string', min: 2, max: 30, message: '长度在2-30个字符', trigger: 'blur' },
          { required: true, pattern: validator.REGEXP.CHINESE_NAME, trigger: 'blur', message: '格式不符' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { min: 6, max: 50, pattern: validator.REGEXP.EMAIL, message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入联系号码', trigger: 'blur' },
          { min: 6, max: 15, pattern: validator.REGEXP.MOBILE, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        smsCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
          { type: 'string', min: 4, max: 6, message: '输入有误', trigger: 'blur' },
          {            validator: (rule, value, callback) => {
              if (!this.ruleForm.phoneId) {
                callback(new Error('请先获取验证码'))
              } else {
                callback()
              }
            },
            trigger: 'blur'          }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'string', min: 4, max: 16, message: '长度在4-16个字符', trigger: 'blur' },
          { pattern: validator.REGEXP.USER_NAME, message: '请不要输入特殊字符', trigger: 'blur' },
          {            validator: (rule, value, callback) => {
              this.checkUserName(value).then(res => {
                callback()
              }, () => {
                callback(new Error('用户名已被注册'))
              })
            },
            trigger: 'blur'          }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', pattern: validator.REGEXP.PASSWORD, message: '长度在6-20个字符，格式为字符+数字', trigger: 'blur' },
          {            validator: (rule, value, callback) => {
              if (this.ruleForm.confirmPassword) {
                this.$refs.regForm.validateField('confirmPassword')
              }
              callback()
            },
            trigger: 'blur'          }
        ],
        confirmPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {            validator: (rule, value, callback) => {
              if (this.ruleForm.userPwd && value !== this.ruleForm.userPwd) {
                callback(new Error('两次密码输入不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'          }
        ]
      }
    }
  },
  created() {
    localStorage.clear()
  },
  mounted() {
    if (this.$route.query.token) {
      this.getCurrentUserInfo()
    } else if (this.$route.query.from && this.$route.query.from === 'yzw') {
      this.getSoureData()
    }
  },
  watch: {
    second3() {
      if (this.second3 === 0) {
        this.toLogin()
      }
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    }
  },
  methods: {
    getCurrentUserInfo() {
      this.$http('currentUserInfo', {}, { isToken: false, isLogin: false, reSetToken: true, Authorization: this.$route.query.token }).then(res => {
        let userInfo = res.data
        this.saveLogin(userInfo)
        this.$router.push({ name: 'index' })
      })
    },
    getSoureData() {
      this.$http('getYZWRegisterInfo', { from: this.$route.query.from, userNumber: this.$route.query.userNumber }, { isToken: false, isLogin: false }).then(res => {
        // Object.assign(this.ruleForm, res.data)
        this.ruleForm.customerName = res.data.enterpriseName
        this.ruleForm.contactName = res.data.contact
        this.ruleForm.email = res.data.email
        this.ruleForm.mobile = res.data.phone
        this.ruleForm.userName = res.data.userName
        this.ruleForm.smsCode = res.data.userName
      })
    },
    copyName(val) {
      this.ruleForm.userName = val
    },
    // 检测用户名唯一性
    checkUserName(name) {
      return this.$http('user/checkName', { userName: name })
    },
    customerName(name) {
      return this.$http('customerInfoFromQCC', { customer: name }, { isLogin: false })
    },
    getCode(name) {
      const
        vm = this,
        data = {
          districtNumber: vm.ruleForm.districtNumber,
          mobile: vm.ruleForm.mobile
        }

      if (!validator.isMobile(vm.ruleForm.mobile)) {
        vm.$refs.phoneCode && (vm.$refs.phoneCode.checked = false)
        vm.$alert('手机号格式不正确')
      } else {
        vm.$refs.phoneCode && (vm.$refs.phoneCode.checked = true)

        if (!data.mobile) {
          vm.$refs.phoneCode && (vm.$refs.phoneCode.checked = false)
          return
        }

        vm.$store.dispatch('A_GET_SMSCODE', data).then((res) => {
          // vm.ruleForm[name + 'Id'] = res.code
          // document.querySelector('#' + name + 'CodeId').value = res.code
          // if (res.testCode) {
          //     vm.ruleForm[name + 'Code'] = res.testCode
          // }
        })
      }
    },
    toLogin() {
      this.$router.push({
        name: 'login',
        query: { userName: this.ruleForm.userName }
      })
    },
    saveUserInfo1() {
      this.dialogVisible = true
      this.reduceTime = setInterval(() => {
        this.second3--
        if (this.second3 === 0) {
          clearInterval(this.reduceTime)
        }
      }, 1000)
    },
    // 保存管理员信息
    saveUserInfo(formName) {
      const vm = this
      if (!vm.agree) {
        const text = `<p>
                    您必须接受并同意
                    <strong class="c-blue">《系统软件许可及服务协议》</strong>
                    </p>`
        vm.$alert(text, {
          dangerouslyUseHTMLString: true,
          callback: action => { }
        })
        return
      }
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          vm.ruleForm.isSupplier = '1'
          if (this.$route.query.from === 'yzw') {
            vm.ruleForm.source = this.$route.query.from
            vm.ruleForm.sourceId = this.$route.query.userNumber
            vm.$http('registerOpen', vm.ruleForm).then((res) => {
              vm.saveLogin(res.data)
              vm.$router.push({ name: 'index' })
            })
          } else {
            vm.$http('register', vm.ruleForm).then((res) => {
              this.saveUserInfo1()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  components: {
    'c-get-code-btn': () => import('@views/common/c-get-code-btn'),
    'appFooter': () => import('../common/layout/c-footer'),
    'c-forget': () => import('../common/forget')
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/css/mixin/constants'; // 公共变量

$width = 1100px;

.login-main {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // background: url('../../assets/img/loginBG1.png') no-repeat center;
  background-color: #0a1954;
  background-size: 100% 100%;

  .formArea2 {
    width: $width;
    // background: #fff;
    top: 50px;
    left: 50%;
    border-radius: 4px;
    height: 300px;
    margin-left: -($width / 2);

    .title {
      width: 100%;
      height: 50px;
      font-size: 15px;
      color: #3B4966;
      line-height: 50px;
      text-align: left;
      padding-left: 41px;
      background-image: linear-gradient(-180deg, #b4d1ff66 0%, #4088fd69 100%);
    }

    .body-centent {
      padding-left: ($width / 4);
      padding-top: 20px;
      padding-bottom: 30px;
    }
  }

  .formArea {
    // position: absolute;
    width: $width;
    // background: #fff;
    top: 50px;
    left: 50%;
    border-radius: 4px;
    height: calc(100% - 260px);
    overflow: auto;
    margin-left: -($width / 2);

    .title {
      width: 100%;
      height: 50px;
      font-size: 15px;
      color: #3B4966;
      line-height: 50px;
      text-align: left;
      padding-left: 41px;
      background-image: linear-gradient(-180deg, #b4d1ff66 0%, #4088fd69 100%);
    }

    .body-centent {
      padding-left: ($width / 4);
      padding-top: 20px;
      padding-bottom: 30px;

      .input-code >>> .el-input-group__append {
        border: none;
        background-color: #fff;
        // margin-right: 10px;
      }

      .el-form-item >>> .el-input {
        width: 380px;
        float: left;
      }

      .el-form-item >>> .el-form-item__error--inline {
        float: left;
        top: 10px;
      }

      .el-select >>> .el-input {
        width: 230px;
      }

      .pad40 {
        padding-left: 40px;
        padding-right: 40px;
      }

      >>> .input-with-select {
        // +.el-form-item__error {
        // margin-left: 140px;
        // }
        .el-input-group__prepend {
          background-color: #fff;
        }

        .el-input {
          width: 140px;
        }
      }

      .el-form-item .tips {
        color: $font-999;
        padding-left: 5px;
      }
    }

    .body-centent2 {
      padding-left: 480px;
      background: url('../../assets/img/flow.png') no-repeat 40px 30px;
      background-size: 380px;
    }
  }

  .logoinHeader {
    width: 100%;
    height: 80px;
    background-color: #fff;
    line-height: 80px;
    padding-left: 15%;
  }

  .logo {
    width: 300px;
    height: 80px;
    background: url('../../assets/img/logo.png') no-repeat center;
    background-size: 200px;
  }
}
</style>
