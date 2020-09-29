<template>
  <el-container style="height: 100%">
    <el-header class="simpleHeader page-simple-header">
      <div class="header-main">
        <span class="top-logo"
          ><img src="~@/assets/images/logo.png" alt=""
        /></span>
        <span class="top-title">商家后台</span>
      </div>
    </el-header>
    <el-main id="simple-container-main">
      <div id="simple-components">
        <slot></slot>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'Default'
};
</script>
<style scoped lang="scss">
.simple-container {
  height: 100%;
}
.simpleHeader {
  width: 100%;
  background-color: #fff;
  @media screen and (min-width: 851px) {
    height: 80px !important;
    line-height: 80px;
  }
  @media screen and (min-width: 750px) and (max-width: 850px) {
    height: 60px !important;
    line-height: 60px;
  }
}
#simple-container-main {
  padding: 0;
}
#simple-components {
  height: 100%;
  padding: 42px 0 0;
  @media screen and (max-width: 750px) {
    padding: 18px 0 0;
  }
}
.header-main {
  width: $width;
  @media screen and (min-width: 750px) and (max-width: 1080px) {
    width: 700px;
  }
  @media screen and(min-width: 500px) and (max-width: 750px) {
    width: 500px;
  }
  margin: auto;
}
.top-logo img {
  height: 50px;
  @media screen and (max-width: 750px) {
    height: 24px;
  }
  vertical-align: middle;
}
.top-title {
  font-size: 28px;
  @media screen and (max-width: 750px) {
    font-size: 18px;
  }
  font-weight: bold;
  color: #666;
  margin: 0;
  vertical-align: middle;
  &::before {
    content: '';
    display: inline-block;
    height: 35px;
    vertical-align: middle;
    margin: 0 30px;
    border-right: 1px solid #dcdfe6;
    @media screen and (max-width: 750px) {
      height: 20px;
      margin: 0 12px;
    }
  }
}
</style>
