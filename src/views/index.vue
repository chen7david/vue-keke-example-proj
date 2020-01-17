<template>
  <div class="content cf" style="box-shadow:none">
    <el-row>
      <el-row class="p">欢迎进入max的业务系统！</el-row>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'index',
  data() {
    return {
      loadingTodoList: true,
      loadingNoticeList: true,
      noticeLIst: []
    }
  },
  watch: {},
  created() {
  },
  components: {},
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.content {
  background: transparent !important;
  padding: 10px !important;

  .fixIcon {
    width: 40px;
    height: 100px;
    position: fixed;
    right: 30px;
    top: 45%;
    background-color: #fff;

    .fixIconInner {
      text-align: center;
      line-height: 70px;
      height: 50px;
      border: 1px solid #DCDFE6;
      border-radius: 2px;
      font-size: 12px;
      color: #909399;
      letter-spacing: 0;
      background-image: url('../assets/img/kefu.png');
      background-repeat: no-repeat;
      background-position: center 5px;
      background-size: 18px;
      background-color: #fff;
      position: relative;

      &.no-bottom {
        border-bottom: none;
      }

      .extend {
        display: none;
        padding-top: 15px;
        width: 200px;
        height: 90px;
        padding-left: 15px;
        text-align: left;
        background-color: #fff;
        position: absolute;
        left: -220px;
        top: 0;
        font-size: 14px;
        border: 1px solid #DCDFE6;
        color: #606266;

        p {
          line-height: 30px;
        }
      }

      .extend2 {
        width: 200px;
        height: 200px;
        left: -250px;
        background: url('../assets/img/erweima.png') no-repeat center;
        background-size: 200px;

        &:hover {
          .extend2 {
            display: block;
          }
        }
      }

      .extend3 {
        width: 200px;
        height: 200px;
        left: -250px;
        background: url('../assets/img/qrCode1.png') no-repeat center;
        background-size: 200px;

        &:hover {
          .extend2 {
            display: block;
          }
        }
      }

      &.sc {
        background-image: url('../assets/img/gzhActive.png');

        &:hover {
          background-color: #4088FD;
          color: #fff;
          background-image: url('../assets/img/gzh.png');
        }
      }

      &.mobile {
        background-image: url('../assets/img/mobile.png');

        &:hover {
          background-color: #4088FD;
          color: #fff;
          background-image: url('../assets/img/mobile-white.png');
        }
      }

      &.feedback {
        background-image: url('../assets/img/feedback.png');

        &:hover {
          background-color: #4088FD;
          color: #fff;
          background-image: url('../assets/img/feedbackHover.png');
        }
      }

      &:hover {
        background-color: #4088FD;
        color: #fff;
        background-image: url('../assets/img/kefuActive.png');

        .extend {
          display: block;
        }
      }
    }
  }

  .banner {
    width: 100%;
    height: 230px;
    background: url('../assets/img/banner1980.png') no-repeat center;
    background-size: cover;
  }

  .step {
    width: 100%;
    height: 230px;
    margin-top: 30px;
    background-color: #fff;
    padding-top: 30px;
    padding-left: 30px;

    .stepInner {
      width: 100%;
      height: 140px;
      background: url('../assets/img/stepInner.png') no-repeat center;
      background-size: 900px;
    }
  }

  .intro {
    width: 100%;
    height: 230px;
    margin-top: 30px;

    .sub {
      height: 100%;
      padding: 25px 30px;
      background-color: #fff;
      font-size: 14px;
      color: #909399;
      letter-spacing: 0;
      line-height: 25px;
      text-align: justify;

      .m-title {
        margin-bottom: 10px;
      }

      .txtList {
        height: 140px;
        overflow: auto;

        li {
          height: 40px;
          line-height: 40px;
          padding-left: 5px;
          padding-right: 5px;
          border-bottom: 1px solid #DCDFE6;

          &:hover {
            .txtName, .txtTime {
              color: #4088FD;
              cursor: pointer;
            }

            .txtName a {
              color: #4088FD;
            }
          }

          .txtName {
            display: inline-block;
            width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;

            a {
              color: #606266;
            }

            &.notice {
              color: #F56A00;
              width: 100%;
              cursor: pointer;

              &:hover {
                color: #FF9420;
              }
            }
          }

          .txtTime {
            float: right;
          }
        }
      }
    }
  }
}

.welcomeTxt {
  font-size: 46px;
  color: #999999;
  letter-spacing: 1.02px;
  position: relative;
  height: 100%;

  .p {
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    width: 800px;
    text-align: center;
    margin-left: -400px;
  }
}
</style>
