<template>
  <div class="topTags">
    <div class="topTags_box" :class="c__is_scroll">
      <span
        class="el-icon-arrow-left tags_left tags_scroll__btn"
        @click="fn_click__scroll(1)"
      ></span>
      <div class="tags_groups" ref="tag_dom">
        <template v-for="item in c__tag_list">
          <el-tag
            :class="{
              active: item.path === active_router.path,
              trigger_contextmenu: triggerContextmenuClass
            }"
            :key="item.path"
            :closable="!item.meta.fixed"
            @click="fn_click__open(item)"
            @close="fn_click__tag('fn_a_tag__close', item)"
            @contextmenu.native.prevent="fn_click_openContextmenu($event, item)"
            >{{ item.meta.title }}</el-tag
          >
        </template>
      </div>

      <span
        class="el-icon-arrow-right tags_right tags_scroll__btn"
        @click="fn_click__scroll(-1)"
        ref="tagbtn_dom"
      ></span>
    </div>

    <right-tag
      @handle-tag="fn_click__tag"
      @refresh-current="fn_click__refresh"
    />
    <context-menu
      :contextmenu-visble="contextmenuVisble"
      :contextmenu-point="contextmenuPoint"
      :close-current="c__close_current"
      @refresh-current="fn_click__refresh"
      @handle-tag="fn_click__tag"
    />
  </div>
</template>

<script>
import RightTag from './components/RightTag';
import ContextMenu from './components/ContextMenu';
import { mapGetters } from 'vuex';
export default {
  name: 'Tags',
  components: {
    RightTag,
    ContextMenu
  },
  data() {
    return {
      tag_dom: null,
      contextmenuVisble: false,
      contextmenuPoint: [0, 0],
      triggerContextmenuClass: 'trigger_contextmenu',
      contextmenuTag: null,
      client_width: 0, // .topTags_box 的宽度
      scroll_width: 0, // .topTags_box 的 scrollWidth 值
      scroll_step: 80, // 每次滚动的长度
      scroll_left: 0 // 最终滚动的距离
    };
  },
  computed: {
    ...mapGetters(['fixed_tags', 'active_router', 'tags']),
    c__tag_list() {
      return [...this.fixed_tags, ...this.tags];
    },
    c__close_current() {
      return !(this.contextmenuTag && this.contextmenuTag.meta.fixed);
    },
    c__is_scroll() {
      return {
        is_scroll: this.client_width < this.scroll_width
      };
    }
  },
  mounted() {
    this.tag_dom = this.$refs.tag_dom;
    this.fn_get__scroll_width();
  },
  methods: {
    fn_click_openContextmenu(event, tag) {
      // console.log(event);
      // const path = event.path || (event.composedPath && event.composedPath()); // 获取触发事件元素冒泡过程的所有元素
      // let current_target = event.target;
      // let target = null;
      // let [left, top] = [0, 0];
      // path.some(e => {
      //   if ([].indexOf.call(e.classList, this.triggerContextmenuClass) > -1) {
      //     target = e;
      //     return true;
      //   }
      //   return false;
      // });
      // console.log(target);
      // if (current_target !== target) {
      //   let [clientWidth, clientHeight] = [target.clientWidth, clientHeight];
      //   let [offsetLeft, offsetTop] = [target.offsetLeft, target.offsetTop];
      //   left = clientWidth + offsetLeft - 2 * event.layerX;
      //   top = clientHeight + offsetTop + event.layerY;
      // } else {
      //   left = event.layerX;
      //   top = event.layerY;
      // }
      // this.contextmenuPoint = [left, top];

      this.contextmenuPoint = [event.clientX, event.clientY];
      this.contextmenuVisble = true;
      this.contextmenuTag = tag;
    },
    fn_click__tag(command, tag = this.contextmenuTag) {
      this.$store.dispatch(command, tag);
    },
    fn_click__refresh() {
      console.log('fn_click__refresh');
    },

    fn_click__open(item) {
      this.active = item;
      this.$router.push(item.path);
    },
    fn_click__closeContextmenu() {
      this.contextmenuVisble = false;
    },
    // 计算距离
    fn_get__scroll_width() {
      this.client_width = this.tag_dom.clientWidth;
      this.scroll_width = this.tag_dom.scrollWidth;
    },
    /**
     * @desc 滚动方法
     * @param {Number} direction 滚动方向 -1->左;1->右
     */
    fn_click__scroll(direction = -1) {
      let scroll_left = -this.tag_dom.scrollLeft;
      scroll_left = scroll_left + this.scroll_step * direction;
      // element.scrollTo  https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTo
      this.$nextTick(() => {
        this.tag_dom.scrollTo({
          left: -scroll_left,
          behavior: 'smooth'
        });
      });
    }
  },
  watch: {
    contextmenuVisble(val) {
      if (val) {
        document.body.addEventListener(
          'click',
          this.fn_click__closeContextmenu
        );
      } else {
        document.body.removeEventListener(
          'click',
          this.fn_click__closeContextmenu
        );
      }
    },
    c__tag_list() {
      this.$nextTick(() => {
        this.fn_get__scroll_width();
      });
    },
    active_router() {
      this.$nextTick(() => {
        // 将活动的tag滚动到可视范围
        document
          .querySelector('.el-tag.el-tag--light.active')
          .scrollIntoView({ behavior: 'smooth' });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.topTags {
  height: 40px;
  padding: 0 12px;
  background-color: #fff;
  display: flex;
  align-items: center;
  position: relative;
}
.topTags_box {
  margin-right: auto;
  overflow: hidden;
  padding: 0 20px 0 10px;
  position: relative;
  white-space: nowrap;
}
.topTags_box.is_scroll {
  padding: 0 40px 0 20px;
}
.topTags_box .el-tag {
  background: none;
  color: #333;
  border: none;
  margin-right: 12px;
  cursor: pointer;
  border-radius: 0;
}
.tags_scroll__btn {
  position: absolute;
  top: 1px;
  cursor: pointer;
  width: 32px;
  text-align: center;
  line-height: 40px;
  z-index: 2;
  background: #fff;
  display: none;
}
.topTags_box.is_scroll .tags_scroll__btn {
  display: block;
}
.tags_scroll__btn:hover {
  color: $color;
}
.tags_left {
  left: -5px;
}
.tags_right {
  right: 0;
}
.tags_groups {
  transition: transform 1000ms;
  overflow: hidden;
}
.topTags_box .el-tag /deep/ .el-tag__close {
  display: none;
}
.topTags_box .el-tag:hover /deep/ .el-tag__close {
  display: inherit;
}
.topTags_box .el-tag.active {
  border-bottom: 2px solid $color;
}
.topTags_box .el-tag.active /deep/ .el-tag__close {
  display: inherit;
}
</style>
