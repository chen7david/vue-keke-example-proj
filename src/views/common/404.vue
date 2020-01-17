<template>
  <section class="content">
      <el-row class="errormain">
        <el-col :span='8'>
          <div class="error-page-img">
          </div>
        </el-col>
        <el-col class="error-page-content" :span='16'>
          <p style="font-size:20px;margin-bottom:40px;color:#303133">404 未找到页面</p>
          <p class="txt">您访问的页面不存在，请返回主页!</p>
          <p class="button-p">
            <el-button type="primary" @click='goHome'>返回主页</el-button>
          </p>
        </el-col>
      </el-row>
  </section>
</template>

<script>

export default {
    name: 'error-page',
    data () {
        return {

        }
    },
    methods: {
        goHome () {
            this.$router.replace({
                path: '/'
            })
        }
    }
}
</script>

<style lang="stylus">
body {
  background: #f8f8f8;
}

  .errormain {
    width: 800px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -400px;

    // height :
    .error-page-img {
      width: 200px;
      height: 200px;
      margin-top: 50px;
      margin-left: 40px;
      background-size: cover;
      background: url('../../assets/img/404.png') no-repeat center center !important;
    }

    .error-page-content {
      padding: 50px;
      height: 100%;

      .button-p {
        position: absolute;
        bottom: 60px;
      }

      .txt {
        line-height: 25px;
        color: #606266;
      }
    }
}
</style>
