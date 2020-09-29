<template>
  <div class="top-left">
    <img
      class="top-left__logo"
      src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
      alt=""
      width="42"
      height="42"
    />
    <span class="top-left__title" v-if="!showCollapse">{{ title }}</span>
    <i
      class="el-icon-s-fold"
      @click.stop="setCollapse"
      style="font-size: 18px;cursor: pointer"
    ></i>
  </div>
</template>

<script>
import website from '@/conf/website';
export default {
  name: 'TopLeft',
  computed: {
    title() {
      return website.title;
    }
  },
  data() {
    return {
      showCollapse: false,
      isCollapse: false
    };
  },
  methods: {
    setCollapse() {
      this.$emit('collapse-change');
    }
  }
};
</script>

<style scoped lang="scss">
.top-left {
  display: flex;
  align-items: center;
}
.top-left__logo {
  border-radius: 50%;
  margin-right: 5px;
}
.top-left__title {
  font-size: 16px;
  cursor: default;
  margin-right: 5px;
}
</style>
