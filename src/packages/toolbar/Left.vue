<template>
  <el-row class="toolbar_left">
    <el-button
      v-if="addBtn"
      type="primary"
      :size="size"
      icon="el-icon-plus"
      @click="addRow"
    >
      新增
    </el-button>
    <slot></slot>
  </el-row>
</template>
<script>
export default {
  name: 'ToolbarLeft',
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
    }
  }
};
</script>
<style lang="scss" scoped></style>
