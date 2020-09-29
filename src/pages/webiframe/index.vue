<template>
  <div class="app-container">
    <iframe
      ref="child_window"
      class="WebIframe"
      :src="to_url"
      width="100%"
      height="100%"
      name="webiframe"
    ></iframe>
  </div>
</template>
<script>
export default {
  name: 'WebIframe',
  data() {
    return {
      to_url: '',
      child_window: null
    };
  },
  created() {
    this.fn_get__link();
  },
  methods: {
    fn_get__link() {
      this.to_url = this.$route.query.to + this.$route.hash;
    }
  },
  watch: {
    $route() {
      this.fn_get__link();
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
iframe {
  border: none;
}
</style>
