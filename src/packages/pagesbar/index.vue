<template>
  <el-row style="height: 60px" type="flex" justify="end" align="middle">
    <el-pagination
      background
      @size-change="fn_change_size"
      @current-change="fn_change_current"
      :current-page="computed__page.currentPage"
      :page-sizes="computed__page.pageSizes"
      :page-size="computed__page.pageSize"
      :layout="layout"
      :total="computed__page.total"
    >
    </el-pagination>
  </el-row>
</template>
<script>
export default {
  name: 'Pagesbar',
  props: {
    page: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      defaultPage: {
        currentPage: 1,
        pageSizes: [10, 15, 30, 50, 80],
        pageSize: 10,
        total: 0
      }
    };
  },
  computed: {
    computed__page() {
      return this.page ? { ...this.defaultPage, ...this.page } : false;
    },
    layout() {
      let layout = ['prev', ' pager', 'next', 'jumper'];
      if (this.page.pageSizes) {
        layout.unshift('sizes');
      }
      if (this.page.total) {
        layout.unshift('total');
      }
      return layout.join();
    }
  },
  methods: {
    /**
     * @fun sizeChange
     * @desc 每页条数改变方法
     * @param {Number} val 每页条数
     */
    fn_change_size(val) {
      this.$emit('size-change', val);
    },
    /**
     * @fun currentChange
     * @desc 当前页数改变方法
     * @param {Number} val 当前页数
     */
    fn_change_current(val) {
      this.$emit('current-change', val);
    }
  }
};
</script>
<style lang="scss" scoped></style>
