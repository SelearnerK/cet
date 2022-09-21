<template>
  <el-container class="container">

    <!-- 头部区域 -->
    <el-header>
      <head-bar></head-bar>
    </el-header>
    <!-- 主内容区域 -->
    <el-main>
      <main-content></main-content>
    </el-main>
    <el-footer class="footer-div">
      <div class="footer-div">
        <span class="footer-span">版权所有 © copyright 2020 生态环境部南京环境科学研究所. All rights reserved.</span>
        <span class="footer-span">地址：江苏省南京市蒋王庙8号 </span>
        <span class="footer-span">联系方式：025-85287057 </span>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
  import HeadBar from "./HeadBar/HeadBar"
  import NavBar from "./NavBar/NavBar"
  import MainContent from "./MainContent/MainContent"
  export default {
    components: {
      HeadBar,
      NavBar,
      MainContent
    }
  };

</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    // background: rgba(224, 234, 235, 0.1);
  }

  .footer-div {
    color: #bbb;
    margin:0 auto;
    text-align:center;
  }

  .footer-span {
    display: block;
    float: left;
    margin-right:100px;
  }

</style>
