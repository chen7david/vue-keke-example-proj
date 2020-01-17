<template>
  <div class="sidebar">
    <div class="menu">
      <el-menu :default-active="active" @open="handleOpen" @close="handleClose" @select="select" :collapse="isCollapse"
        :default-openeds="defaultArr">
        <el-submenu :index="m.accessUri+index" v-for='(m,index) in menuList2' :key='index'>
          <template slot="title">
            <i class="icon-bubbles2"></i>
            <span>{{m.permissionName}}</span>
          </template>
          <el-menu-item v-for='(i,subIndex) in m.subPermissions' :key='subIndex' :index="(i.accessUri.slice(1))">
            {{i.permissionName}}
            <span class="waitTag" v-if='todoArr.includes(i.accessUri)'></span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: 'sidebar',
  props: {
    value: {
      defalult: true
    }
  },
  data() {
    return {
      todoArr: [],
      yeah: new Date().getFullYear(),
      active: 'index',
      isCollapse: false,
      menuList: [],
      defaultArr: [],
      menuList2: [
        {
          accessUri: '',
          permissionName: '账单管理',
          subPermissions: [
            {
              accessUri: '/register-new-1',
              permissionName: '企业信息1'
            },
            {
              accessUri: '/register-new-2',
              permissionName: '企业信息2'
            },
            {
              accessUri: '/register-new-3',
              permissionName: '企业信息3'
            },
            {
              accessUri: '/register-new-4',
              permissionName: '企业信息4'
            }
          ]
        },
        {
          accessUri: '',
          permissionName: '人员管理',
          subPermissions: [
            {
              accessUri: '/register-new-5',
              permissionName: '企业信息1'
            },
            {
              accessUri: '/register-new-6',
              permissionName: '企业信息2'
            },
            {
              accessUri: '/register-new-7',
              permissionName: '企业信息3'
            },
            {
              accessUri: '/register-new-8',
              permissionName: '企业信息4'
            }
          ]
        }
      ],
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.isChild) {
        this.active = to.meta.parentName
      } else {
        this.active = to.name
      }
    }
  },
  mounted() {
    let notLoad = ['login', 'forget', 'register-new']
    let pathname = this.getPathName()
    if (this.$route.meta.isChild) {
      this.active = this.$route.meta.parentName
    } else {
      this.active = this.$route.name
    }
  },
  methods: {
    getPathName() {
      // 不能放在data里，因为data只执行一次，这里要动态实时获取
      return location.pathname ? location.pathname.slice(1) : null
    },
    handleOpen(key, keyPath) { },
    handleClose(key, keyPath) { },
    select(key, keyPath) {
      if (!key || !isNaN(key)) return
      this.$router.push({
        name: key
      })
      // console.log(key, keyPath);
    },
    toggleMenu() {
      this.$emit('input', !this.value)
      this.isCollapse = !this.isCollapse
    },
    setMenu() {
      this.$http('user/menu', { systemName: 'QYD' }).then(res => {
        // this.menuList = [...res.data, ...this.menuList2]
        this.menuList = res.data
        this.defaultArr = res.data.map((element, index) => {
          return element.accessUri + index
        })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/mixin/constants';

.waitTag {
  border-radius: 5px;
  // margin-left:10px;
  display: inline-block;
  width: 60px;
  height: 30px;
  background: url('../../../assets/img/todo.png') no-repeat center;
  background-size: 30px;
}

::-webkit-scrollbar {
  width: 10px;
  height: 6px;
}

::-webkit-scrollbar-button {
  height: 0px;
  width: 0px;
}

::-webkit-scrollbar-thumb {
  background-color: #cdcdcd;
  border-radius: 4px;
}

// tags
.sidebar {
  width: 200px;
  height: 100%;
  background-color: #fff;
  position: absolute;
  padding-top: 60px;
  left: 0;
  color: #3B4966;
  line-height: 20px;

  // box-shadow: 2px 0 7px 0 rgba(85, 164, 246, 0.15);
  i[class^='icon-'] {
    font-size: 18px;
    margin-right: 5px;
    display: inline-block;
  }

  .menu {
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    max-width: 100%;
    bottom: 40px;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 2;

    // box-shadow: 2px 0 7px 0 rgba(85, 164, 246, 0.15);
    .el-menu {
      background-color: #F6F7FA;
      border-right: 0;

      // >>> .el-submenu__title {
      // color: #3B4966;
      // }
      &.el-menu--collapse i[class^='icon-'] {
        transform: scale(1.2);
      }
    }

    >>> .el-menu--inline {
      background-color: #fff;
      // .el-menu-item {
      // color: #3B4966;
      // }
    }
  }

  .toggle {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: right;
    line-height: 40px;
    background-color: #F6F7FC;
    color: #bfcbd9;
    z-index: 3;
    padding-right: 20px;
    box-shadow: -1px 0 3px rgba(255, 255, 255, 0.5);
    border-right: 1px solid #e4e4e4;

    span {
      text-align: center;
      width: 26px;
      height: @width;
      line-height: @width;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      border-radius: 15px;
      vertical-align: middle;
      background: #c2c8d0;
      transition: transform 0.5s;

      &.right {
        transform: rotate(180deg);
      }
    }
  }

  .el-menu a {
    display: block;
    color: #bfcbd9;
  }

  .el-menu >>>.el-submenu__title, >>> .el-submenu__title i {
    color: #3B4966;
    font-size: 16px;

    &:hover {
      background-color: rgba(64, 136, 253, 0.65);
      // background-color: #5d95ef;
      color: #fff;
    }
  }

  .el-menu-item, .el-menu-item i {
    color: #3B4966;
    font-size: 15px;

    &:hover {
      background-color: rgba(64, 136, 253, 0.65);
      // background-color: #5d95ef;
      color: #fff;
    }
  }

  .el-menu-item.is-active {
    color: #fff;
    background: #4088FD;
    color: #FFFFFF;
    letter-spacing: 0.36px;
  }
}
</style>
