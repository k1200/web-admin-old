<template>
  <el-dialog
    ref="dialogbar"
    v-dialog-drag
    :visible.sync="opened"
    :before-close="fn_handle_close"
    :show-close="false"
    :fullscreen="fullscreen"
    :close-on-click-modal="false"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #title>
      <el-row
        class="dialogbar_header"
        :class="{ fullscreen }"
        type="flex"
        justify="space-between"
      >
        <!-- 顶部标题 -->
        <el-row class="dialogbar_title">
          <slot name="title">{{ title }}</slot>
        </el-row>
        <!-- 底部按钮组 -->
        <el-row class="dialogbar_tool">
          <span
            v-if="!fullscreen"
            class="el-icon-full-screen"
            @click="fn_change_fullscreen"
          ></span>
          <span
            v-else
            class="el-icon-copy-document"
            style="transform: rotate(180deg);"
            @click="fn_change_fullscreen"
          ></span>
          <span
            v-if="showClose"
            class="el-icon-close"
            @click="fn_handle_close"
          ></span>
        </el-row>
      </el-row>
    </template>
    <!-- 主要内容 -->

    <!-- dialog_main_box：弹窗主体内容盒子  -->
    <div class="dialog_main_box" :style="{ height: main_height }">
      <el-scrollbar
        style="height: 100%;margin-right:-18px"
        class="page-scrollbar-hidden-x"
      >
        <!-- dialog_main_content：弹窗主体内容  -->
        <div style="padding-right: 18px" class="dialog_main_content">
          <slot></slot>
        </div>
      </el-scrollbar>
    </div>

    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: 'Dialogbar',
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false
    },
    handleClose: {
      type: Function,
      default() {
        return () => {};
      }
    },
    showClose: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '提示'
    }
  },
  data() {
    return {
      opened: false, // 是否打开弹窗
      fullscreen: false, // 是否全屏
      drop_dom: null, // 可拖拽DOM
      main_height: 'auto', // 弹窗内容主要高度
      body_client_height: 0, // 页面可视高度
      offet_bottom: 150 // 距离底部高度
    };
  },
  mounted() {
    this.body_client_height = document.body.clientHeight;
  },
  methods: {
    async fn_handle_close(done) {
      this.handleClose();
      this.$emit('input', !this.value);
      // 将拖拽后的弹窗恢复到默认位置
      let drop_dom = this.$refs.dialogbar.$el.querySelector('.el-dialog');
      setTimeout(() => (drop_dom.style.transform = 'unset'), 300);
      typeof done === 'function' && done();
    },
    // 设置弹窗内容主要高度
    fn_set_height(offet_bottom = this.offet_bottom) {
      // 主要内容实际高度
      let main_client_height = document.querySelector('.dialog_main_content')
        .clientHeight;
      // 主要内容盒子距离视窗边界的距离
      let main_client_rect = document
        .querySelector('.dialog_main_box')
        .getBoundingClientRect();
      // 主要内容最大高度
      let max_height =
        this.body_client_height - main_client_rect.top - offet_bottom;
      let main_height = main_client_height;
      if (main_client_height > max_height) {
        main_height = max_height + 'px';
      } else {
        main_height = 'auto';
      }
      this.main_height = main_height;
    },
    fn_change_fullscreen() {
      this.fullscreen = !this.fullscreen;
      this.$nextTick(() => {
        this.fn_set_height();
      });
    }
  },
  watch: {
    value(val) {
      this.opened = val;
      if (val) {
        this.$nextTick(() => {
          this.fn_set_height();
        });
      } else {
        this.fullscreen = false;
      }
    },
    fullscreen() {
      let drop_dom = this.$refs.dialogbar.$el.querySelector('.el-dialog');
      drop_dom.style.transform = 'unset';
    }
  }
};
</script>
<style lang="scss" scoped>
.page-scrollbar-hidden-x {
  overflow: hidden;
}
/deep/ .el-dialog__body {
  overflow: hidden;
}
/deep/ .el-dialog__header {
  cursor: all-scroll;
}
.dialogbar_header {
  border-bottom: 1px solid #ebebeb;
  margin: 0 -20px -10px;
  padding: 0 10px 15px 20px;
}
.dialogbar_header.fullscreen {
  cursor: unset;
}
.dialogbar_tool span {
  cursor: pointer;
  color: #909399;
  margin-right: 5px;
}
.dialogbar_tool span:hover {
  color: $color;
}
</style>
