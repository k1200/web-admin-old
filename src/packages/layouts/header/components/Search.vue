<template>
  <el-row type="flex" align="center">
    <span class="search_icon web-icon-menu" @click="fn_click__search"></span>
    <input-tree
      class="search_input"
      :class="{ search_input_show: isSearch }"
      :options="menu"
      node-key="menuId"
      size="small"
      :props="{ children: 'children', label: 'name' }"
      @change="fn_change__tree"
      :trigger-on-focus="false"
      placeholder="Search"
    ></input-tree>
  </el-row>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'HeaderSearch',
  computed: {
    ...mapGetters(['menu'])
  },
  data() {
    return {
      isSearch: false
    };
  },
  methods: {
    fn_change__tree() {},
    fn_click__search() {
      this.isSearch = !this.isSearch;
    }
  }
};
</script>
<style lang="scss" scoped>
.search_icon {
  cursor: pointer;
  font-size: 20px;
}
.search_input {
  font-size: 18px;
  transition: width 0.2s;
  width: 0 !important;
  overflow: hidden;
  background: transparent;
  border-radius: 0;
  display: inline-block;
  vertical-align: middle;
}
.search_input /deep/ input {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #eee;
  padding: 0;
  background-color: transparent;
}
.search_input.search_input_show {
  width: 210px !important;
  margin: 0 10px;
}
</style>
