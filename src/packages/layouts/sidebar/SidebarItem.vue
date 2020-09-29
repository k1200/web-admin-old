<template>
  <el-submenu
    v-if="itemMenu.children && itemMenu.children.length > 0"
    :index="itemMenu.name"
  >
    <template slot="title">
      <i class="sidebar_icon" :class="meta.icon"></i>
      <span slot="title">{{ meta.title }}</span>
    </template>

    <sidebar-item
      v-for="item of childrenmenu"
      :key="item.name"
      :item-menu="item"
      v-on="$listeners"
    ></sidebar-item>
  </el-submenu>
  <el-menu-item v-else :index="itemMenu.name" @click="open(itemMenu)">
    <i class="sidebar_icon" :class="meta.icon"></i>
    <span slot="title">{{ meta.title }}</span>
  </el-menu-item>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: {
    itemMenu: {
      type: Object,
      default() {
        return {
          name: '',
          meta: {}
        };
      }
    }
  },
  computed: {
    meta() {
      return this.itemMenu.meta;
    },
    childrenmenu() {
      return this.itemMenu.children || [];
    }
  },
  methods: {
    open(menu) {
      this.$emit('collapse-change');
      this.$router.push(menu.path);
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-submenu.is-active .el-menu-item.is-active {
  background-color: rgb(67, 74, 80) !important;
}
/deep/ .el-menu-item {
  overflow: hidden;
  text-overflow: ellipsis;
}
.sidebar_icon {
  color: #fff;
  margin-right: 3px;
}
</style>
