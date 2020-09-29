<template>
  <el-row
    style="padding: 8px 0"
    type="flex"
    align="middle"
    justify="space-between"
  >
    <!-- 左侧工具栏 提供默认插槽-->
    <toolbar-left :size="size" :add-btn="addBtn" :add-row="addRow">
      <slot></slot>
    </toolbar-left>

    <!-- 右侧工具栏 提供 toolbar_right 插槽-->
    <toolbar-right
      :size="size"
      :refresh-btn="refreshBtn"
      :refresh-callback="refreshCallback"
    >
      <slot name="toolbar_right"></slot>
    </toolbar-right>
  </el-row>
</template>
<script>
import ToolbarRight from './Right';
import ToolbarLeft from './Left';
export default {
  name: 'Toolbar',
  components: {
    ToolbarRight,
    ToolbarLeft
  },
  props: {
    size: {
      type: String,
      default: 'small'
    },
    addBtn: {
      type: Boolean,
      default: true
    },
    // 新增回调
    addRow: {
      type: Function,
      default: () => {}
    },
    refreshBtn: {
      type: Boolean,
      default: true
    },
    // 刷新回调
    refreshCallback: {
      type: Function,
      default: () => {}
    }
  }
};
</script>
<style lang="scss" scoped></style>
