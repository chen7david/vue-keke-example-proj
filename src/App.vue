<template>
  <div id="app">
    <app-header v-if="showHeader" :current="current"></app-header>
    <app-sidebar v-model="toggleMenu" class="sidebar" v-if="showSidebar" ref="sidebar"></app-sidebar>
    <transition name="fade">
      <el-row class="main" :class="{'mainForLogin':registerAndloginResult}">
        <router-view></router-view>
      </el-row>
    </transition>
  </div>
</template>

<script>
import appFooter from '@views/common/layout/c-footer'
import appHeader from '@views/common/layout/c-header'
import appSidebar from '@views/common/layout/c-sidebar'
export default {
  name: 'app',
  data() {
    return {
      toggleMenu: true,
      current: '',
      hideHeadPath: [
        'page-404', 'login', 'forget', 'register'
      ],
      hideFooterPath: [
        'login',
        'register',
        'page-404'
      ],
      hideSidePath: [
        'login',
        'register',
        'forget'
      ],
      showHeader: true,
      showFooter: false,
      showSidebar: false,
      registerAndloginResult: true
    }
  },
  created() {
  },
  computed: {

  },
  updated() {
    this.setMode()
  },
  watch: {
    $route: function () {
      this.registerAndlogin()
    }
  },
  methods: {
    registerAndlogin() {
      let pathName = this.getPathName()
      let arr = ['login', 'register', 'forget']
      this.registerAndloginResult = arr.includes(pathName)
    },
    getPathName() {
      // 不能放在data里，因为data只执行一次，这里要动态实时获取
      return location.pathname ? location.pathname.slice(1) : null
    },
    setMode() {
      // 显示头或尾
      const
        vm = this,
        pathName = vm.getPathName()

      vm.showHeader = !vm.hideHeadPath.includes(pathName)
      vm.showFooter = !vm.hideFooterPath.includes(pathName)
      vm.showSidebar = !vm.hideSidePath.includes(pathName)
    }
  },
  components: { appHeader, appFooter, appSidebar }
}
</script>
<style lang="stylus" scoped>
</style>
