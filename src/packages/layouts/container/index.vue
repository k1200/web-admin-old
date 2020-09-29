<template>
  <el-container class="body-container">
    <el-header class="page-header">
      <page-header @collapse-change="fn_change__collapse" />
    </el-header>
    <el-container class="page-container">
      <el-aside
        class="page-aside"
        :class="autoClass"
        style="width:auto"
        @click.native.stop.prevent
      >
        <page-sidebar
          :is-collapse="isCollapse && device_type !== 'mobile'"
          @collapse-change="fn_click__close"
        />
      </el-aside>
      <el-container class="main-container">
        <el-header class="main-header">
          <page-tags />
        </el-header>
        <el-main id="page-main">
          <div id="main-scrollbar">
            <el-scrollbar
              style="height: calc(100% - 5px)"
              class="page-scrollbar-hidden-x"
            >
              <div id="components" style="padding: 0 20px">
                <router-view />
              </div>
            </el-scrollbar>
          </div>
        </el-main>
        <page-footer />
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import PageHeader from '../header';
import PageSidebar from '../sidebar';
import PageTags from '../tags';
import PageFooter from '../footer';
import device from '@/util/device';
export default {
  name: 'Container',
  components: {
    PageHeader,
    PageSidebar,
    PageTags,
    PageFooter
  },
  data() {
    return {
      isCollapse: false,
      device_type: device.fn_device__type()
    };
  },
  computed: {
    autoClass() {
      return this.isCollapse ? ['is-collapse'] : [];
    }
  },
  methods: {
    fn_change__collapse() {
      this.isCollapse = !this.isCollapse;
    },
    fn_click__close() {
      console.log(6969696969);
      this.isCollapse = false;
    }
  },
  mounted() {
    document.addEventListener('click', this.fn_click__close, false);
  },
  destroyed() {
    document.removeEventListener('click', this.fn_click__close);
  }
};
</script>

<style scoped lang="scss"></style>
