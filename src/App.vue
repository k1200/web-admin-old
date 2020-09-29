<template>
  <div id="app" :class="c__init_class">
    <router-view />
  </div>
</template>
<script>
import device from '@/util/device';
import website from '@/conf/website';
export default {
  computed: {
    c__init_class() {
      let init_calss = [
        device.fn_device__os(), // 系统
        device.fn_device__type(), // 设备类型
        device.fn_device__browse(), // 浏览器
        device.fn_device__orientation() // 设备方向
      ];
      if (website.fixed_width) {
        init_calss.push('is_fixed_width');
      }
      return init_calss;
    }
  }
};
</script>
<style lang="scss">
@import '~@/style/index.scss';
#app {
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
