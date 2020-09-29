<template>
  <div class="error-page">
    <div class="img" style=" background-image: url('/img/bg/404.svg');"></div>
    <div class="content">
      <h1>哦豁</h1>
      <div class="desc">
        <p>
          抱歉，你访问的页面加载失败或该页面正在开发中，如有疑问请联系网站管理员。
        </p>
        <p>
          点击下方按钮返回首页。或者
          <span class="jxg-link"
            >等待 <b>{{ downTime }}</b> s后，自动返回首页</span
          >
        </p>
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
  name: 'AsyncError',
  data() {
    return {
      downTime: 10,
      timeIndex: ''
    };
  },
  beforeRouteLeave(to, form, next) {
    console.log(to);
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
