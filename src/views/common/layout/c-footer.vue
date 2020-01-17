<template>
  <footer class="footer">
    <el-row>
      <el-col :span="11" class="footer-left">
        <p><a href="javascript:;" @click="$refs.fagree.open()">服务条款</a> | <a href="" target="_blank">关于我们</a> | <a href=''
            target="_blank">联系我们</a></p>
        <p>@ {{ yeah }}信息科技服务（深圳）有限公司及其关联公司所有 </p>
      </el-col>
      <el-col :span='12' class="footer-right" :offset="1">
        <el-row>
          <!-- <el-col class='imgDiv'></el-col> -->
          <el-col class='telDiv'>
            <p style="font-size: 24px;">客服热线:12123123123</p>
            <p>工作日：周一至周五 : 9：00—18：00 周六、周日及公众假期：休息</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!-- 注册协议 -->
  </footer>
</template>
<script>
export default {
  data() {
    return {
      yeah: new Date().getFullYear()
    }
  },
}
</script>
<style lang="stylus" scoped>
.footer {
  // height :200px;
  font-size: 14px;
  background-color: #090E25;
  padding: 20px;
  width: 100%;
  // margin-top 20px
  position: absolute;
  bottom: 0;

  .footer-left {
    padding-left: 10%;
  }

  .footer-right {
    .imgDiv {
      display: inline-block;
      width: 80px;
      height: 80px;
      background-size: 80px;
    }

    .telDiv {
      padding-left: 20px;
      display: inline-block;
      width: 600px;
    }
  }

  p {
    height: 40px;
    line-height: 50px;
    color: #999;

    a {
      color: @color;
      // font-size: 16px
    }
  }
}
</style>



