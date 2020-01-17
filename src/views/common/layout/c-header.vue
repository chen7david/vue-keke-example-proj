<template>
  <div class="baner">
    <el-row class="baner-inner">
      <el-row class="logoRow">
        <el-col class="topLogo" :span="3">
          <a class="logo" href="/"></a>
        </el-col>
        <template v-if="userInfo.userName">
          <el-col class="fullHeight pull-right logout">
            <i class="smallIcon-head smallIcon--quit"></i>
            <a @click="loginOut">退出</a>
          </el-col>
          <el-col class="fullHeight pull-right password">
            <i class="smallIcon-head smallIcon--pwd"></i>
            <router-link :to="{name:'change-pwd'}">修改密码</router-link>
          </el-col>
          <el-col class="fullHeight pull-right userName">
            <i class="smallIcon-head smallIcon--user"></i>
            <span>{{'欢迎您，'+userInfo.userName }}</span>
          </el-col>
        </template>
        <template v-else>
          <!-- 没有登录 -->
          <el-col class="fullHeight pull-right userName">
            <router-link :to="{name:'register-new-1'}">
              <i class="icon icon-forget"></i>注册</router-link>
            <router-link :to="{name:'login'}">
              <i class="icon icon-forget"></i>登录</router-link>
          </el-col>
        </template>
      </el-row>

    </el-row>
  </div>
</template>
<script>
import store from "si-store";
export default {
  name: 'baner',
  props: ['current'],
  data() {
    return {
      activeIndex: ''
    }
  },
  created() { },
  computed: {
  },
  methods: {
    handleSelect(val) {
      this.activeIndex = val
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '../../../assets/css/mixin/constants'; // 公共变量

.baner {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;

  .baner-inner {
    width: 100%;
    background: #fff;
    height: 60px;
    padding: 0 25px;
    box-shadow: 0 2px 7px 0 rgba(85, 164, 246, 0.15);

    .logoRow {
      width: 100%;
      color: #90969F;

      .topLogo {
        text-align: left;
        color: #666;
        padding-left: 10px;
        width: 300px;
        height: 60px;
        background: url('../../../assets/img/logo.png') no-repeat 10px center;
        background-size: 160px auto;
        overflow: hidden;

        .logo {
          width: 100%;
          height: 100%;
          display: inline-block;
        }
      }

      .fullHeight {
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        margin-left: 40px;

        a {
          color: #90969F;

          &:hover {
            color: #4088fd;
          }
        }
      }

      .logout {
        width: 70px;
        margin-left: 20px;
      }

      .userName {
        width: 250px;
        text-align: right;
      }

      .password {
        width: 100px;
      }

      .icon {
        display: inline-block;
        height: 15px;
        width: @height;
        margin: 12.5px auto;
      }
    }
  }

  .menuList {
    width: 100%;
    background: #3D3D3D;
    height: 60px;

    .sub-menu {
      width: $page-width;
      margin: 0 auto;
      color: #fff;

      .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        transform: translate(-2px, -2px);
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}

.pull-left {
  float: left;
}

.pull-right {
  float: right;
}

.pad10 {
  padding: 10px;
}
</style>



