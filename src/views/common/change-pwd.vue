<template>
  <section class="content change-pwd">
    <div class="title">修改密码</div>
    <el-form :model="ruleForm" :rules="rules" :inline-message="true" ref="ruleForm" label-width="120px" class="body-centent"
      @submit.native.prevent>
      <el-form-item label="旧密码：" prop="oldPwd">
        <el-input type="password" v-model.trim="ruleForm.oldPwd" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPwd">
        <el-input type="password" v-model="ruleForm.newPwd" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="新密码确认：" prop="password2">
        <el-input type="password" v-model="ruleForm.password2" :maxlength="20"></el-input>
      </el-form-item>

      <div class="buttons">
        <button type="submit" class="btn yellow" @click="submitForm('ruleForm')" id="okBtn">确定</button>
        <button type="button" class="btn border" id="backBtn" @click="$router.back()">返回</button>
      </div>
    </el-form>
  </section>

</template>

<script>
import validator from '@/common/js/plugs/validate'
export default {
  name: 'change-pwd',
  data() {
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        password2: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
          // { type: 'string', min:6, max:16, message: '长度在 6 到 16 个字符，格式为字符+数字', trigger: 'blur' },
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { type: 'string', pattern: validator.REGEXP.PASSWORD, message: '长度在 6 到 20 个字符，格式为字符+数字', trigger: 'blur' },
          {            validator: (rule, value, callback) => {
              if (this.ruleForm.password2) {
                this.$refs.ruleForm.validateField('password2')
              }
              callback()
            },
            trigger: 'blur'          }
        ],
        password2: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {            validator: (rule, value, callback) => {
              if (this.ruleForm.newPwd && value !== this.ruleForm.newPwd) {
                callback(new Error('两次密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'          }
        ]
      }
    }
  },
  watch: {

  },
  created() {
  },

  computed: {
  },
  methods: {
    submitForm(formName) {
      const vm = this
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          // 修改密码
          vm.$http('user/modifyPassword', vm.ruleForm).then((res) => {
            vm.checkStatus(res.data)
          })
        } else {
          console.error('error submit!!')
          return false
        }
      })
    },
    checkStatus(res) {
      const vm = this
      vm.$alert('修改成功', {
        type: 'success',
        callback: action => {
          vm.loginOut()
        }
      })
    }
  },
  components: {

  }
}
</script>

<style lang="stylus" scoped>
form {
  padding: 50px 60px;

  .el-form-item {
    >>> .el-input {
      width: 320px;

      &.input-code {
        width: 130px;
        vertical-align: middle;
      }
    }
  }

  .buttons {
    padding-left: 120px;

    .btn {
      width: 110px;
      margin-right: 20px;
    }
  }
}
</style>
