<template>
  <div class="sidebar">
    <top-left class="sidebar-top" :style="sidebarTitleBgcolor" />
    <el-scrollbar style="height: 100%" class="page-scrollbar-hidden-x">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        :style="{ marginLeft: marginLeft }"
        :unique-opened="true"
        @close="handleClose"
        :collapse="isCollapse"
        :background-color="sidebarBgcolor"
        :text-color="sidebarColor"
        :active-text-color="sidebarActiveColor"
      >
        <sidebar-item
          v-for="item of menu"
          :key="item.name"
          :item-menu="item"
          v-on="$listeners"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import TopLeft from '../header/components/Left';
import website from '@/conf/website';
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
export default {
  name: 'Sidebar',
  components: {
    TopLeft,
    SidebarItem
  },
  props: {
    isCollapse: Boolean
  },
  computed: {
    ...mapGetters(['menu', 'active_router']),
    sidebarBgcolor() {
      return website.sidebarBgcolor;
    },
    sidebarColor() {
      return website.sidebarColor;
    },
    sidebarActiveColor() {
      return website.sidebarActiveColor;
    },
    sidebarTitleBgcolor() {
      return { backgroundColor: website.sidebarTitleBgcolor };
    },
    marginLeft() {
      return this.isCollapse ? '-6px' : 0;
    },
    activeMenu() {
      return this.active_router.name || 'Home';
    }
  },
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  user-select: none;
  position: relative;
  height: 100%;
  background-color: #545c64;
  box-sizing: border-box;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.15);
  padding: 12px 0;
}

.el-menu-vertical-demo.el-menu {
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
}
.sidebar-top {
  display: none;
  position: absolute;
  width: 100%;
  top: 0;
  line-height: 50px;
  justify-content: center;
  /deep/ {
    .top-left__title {
      color: #fff;
    }
    .el-icon-s-fold {
      display: none;
    }
  }
}
</style>
