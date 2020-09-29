<template>
  <div class="error-page">
    <div class="img" style=" background-image: url('/img/bg/404.svg');"></div>
    <div class="content">
      <h1>404</h1>
      <div class="desc">
        抱歉，你访问的页面不存在。点击下方按钮返回首页。或者
        <span class="jxg-link"
          >等待 <b>{{ downTime }}</b> s后，自动返回首页</span
        >
      </div>
      <div class="actions">
        <router-link :to="{ path: '/' }">
          <el-button type="primary">返回首页</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  data() {
    return {
      downTime: 5,
      timeIndex: ''
    };
  },
  beforeRouteLeave(to, form, next) {
    clearInterval(this.timeIndex);
    next();
  },
  created() {
    this.timeIndex = setInterval(() => {
      this.downTime--;
      if (this.downTime === 0) {
        clearInterval(this.timeIndex);
        this.$router.replace('/');
      }
    }, 1000);
  }
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
