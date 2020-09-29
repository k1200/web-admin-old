<template>
  <el-row class="checkboxbar">
    <span style="font-size: 12px"
      >当前已选择 {{ selected.length }} 项数据。</span
    >
    <el-button type="text" size="mini" @click="fnClearSelection">
      清空选择
    </el-button>
    <slot> </slot>
  </el-row>
</template>
<script>
export default {
  name: 'Checkboxbar',
  props: {
    selected: {
      type: Array,
      default() {
        return [];
      }
    },
    fnClearSelection: {
      required: true,
      type: Function
    }
  }
};
</script>
<style lang="scss" scoped></style>
