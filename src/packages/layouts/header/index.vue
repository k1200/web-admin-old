<template>
  <div class="container-top">
    <top-left class="header-top" v-on="$listeners" />
    <top-title />
    <top-right />
  </div>
</template>

<script>
import topLeft from './components/Left';
import topRight from './components/Right';
import topTitle from './components/Title';
export default {
  name: 'Top',
  inheritAttrs: false,
  components: {
    topLeft,
    topRight,
    topTitle
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.container-top {
  background-color: #409eff;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  color: #fff;
  height: 64px;
  line-height: 64px;
  margin: 0 -20px;
  padding: 0 60px;
  display: flex;
  align-items: center;
  .top-title {
    margin-right: auto;
    margin-left: 45px;
  }
}
</style>
