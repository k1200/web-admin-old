<template>
  <el-row>
    <el-form
      :model="queryForm"
      ref="queryForm"
      :inline="inline"
      @submit.native.prevent
    >
      <!-- 自定义搜索条件 -->
      <slot :submit="fn_handle__query"></slot>

      <!-- 搜索按钮 -->
      <el-form-item>
        <!-- 默认搜索按钮 -->
        <el-button
          type="cyan"
          icon="el-icon-search"
          :size="size"
          @click="fn_handle__query"
          :loading="loading"
          >搜索</el-button
        >
        <el-button
          icon="el-icon-refresh"
          :size="size"
          @click="fn_click__reset"
          :loading="loading"
          >重置</el-button
        >
        <!-- 自定义搜索工具 -->
        <slot name="searchBtn"></slot>
      </el-form-item>
    </el-form>
  </el-row>
</template>
<script>
/**
 *
 *  +++++++++++++++++++++++++++ Script Script Script +++++++++++++++++++++++++++
 *  +++++++++++++++++++++++++++ Script Script Script +++++++++++++++++++++++++++
 *
 */
import { fn_util__filter_null } from '@/util/util';
export default {
  name: 'Searchbar',
  props: {
    queryForm: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: 'small'
    },
    inline: {
      type: Boolean,
      default: true
    },
    // 搜索按钮回调 获取列表数据
    fnGetList: {
      required: true,
      type: Function
    },
    // 重置按钮回调
    fnResetForm: {
      required: true,
      type: Function
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    // 搜索按钮操作
    async fn_handle__query() {
      this.loading = true;
      let form = fn_util__filter_null(this.queryForm);
      await this.fnGetList(form);
      this.loading = false;
    },
    // 重置按钮操作
    fn_click__reset() {
      this.loading = true;
      this.$refs.queryForm.resetFields();
      this.fnResetForm();
      this.$nextTick(() => this.fn_handle__query());
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-form-item {
  margin-bottom: 8px;
}
</style>
