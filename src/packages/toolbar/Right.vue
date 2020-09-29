<template>
  <el-row class="toolbar_right">
    <slot></slot>
    <el-tooltip v-if="refreshBtn" effect="dark" content="刷新" placement="top">
      <el-button
        :size="size"
        circle
        icon="el-icon-refresh"
        @click="refreshCallback"
      >
      </el-button>
    </el-tooltip>
  </el-row>
</template>
<script>
export default {
  name: 'ToolbarRight',
  props: {
    size: {
      type: String,
      default: 'small'
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
