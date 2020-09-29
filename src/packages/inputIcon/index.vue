<template>
  <el-autocomplete
    v-model="selected_icon"
    popper-class="input_icon"
    :class="selected_icon"
    :fetch-suggestions="fn_query_search"
    :placeholder="placeholder"
    @select="fn_click__select"
    readonly
    clearable
    ref="autocomplete"
    style="width: 100%"
  >
    <i class="el-input__icon" :class="selected_icon" slot="prefix"> </i>
    <i
      class="el-icon-close el-input__icon"
      slot="suffix"
      @click="fn_click__reset"
    >
    </i>
    <template slot-scope="{ item }">
      <span
        class="input_iconfont "
        :class="css_prefix_text + item.font_class"
      ></span>
    </template>
  </el-autocomplete>
</template>
<script>
import iconfont from './icon';
export default {
  name: 'InputIcon',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择内容'
    }
  },
  computed: {
    selected_icon: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  data() {
    return {
      selected: null,
      css_prefix_text: iconfont.css_prefix_text, // iconfont 前缀
      restaurants: iconfont.glyphs // 待选数据
    };
  },
  methods: {
    fn_query_search(queryString, cb) {
      // 调用 callback 返回建议列表的数据
      cb(this.restaurants);
    },
    fn_click__select(item) {
      this.selected = item;
      this.selected_icon = this.css_prefix_text + item.font_class;
    },
    fn_click__reset() {
      this.selected = null;
      this.selected_icon = '';
    }
  }
};
</script>
<style lang="scss" scoped>
[class^='el-autocomplete web-icon']:before {
  display: none;
}
.el-autocomplete /deep/ .el-input__inner {
  padding-left: 15px;
}
[class^='el-autocomplete web-icon'] /deep/ .el-input__inner {
  padding-left: 40px;
}
[class^='el-autocomplete web-icon'] /deep/ .el-input__prefix .el-input__icon {
  font-size: 32px;
  color: #999;
}
.el-autocomplete /deep/ .el-input__suffix {
  cursor: pointer;
  display: none;
}
.el-autocomplete /deep/ .el-input__suffix:hover {
  color: $color;
}
[class^='el-autocomplete web-icon'] /deep/ .el-input__suffix {
  display: block;
}
</style>

<style lang="scss">
.input_icon /deep/ ul {
  display: flex;
  flex-wrap: wrap;
}
.input_icon /deep/ .input_iconfont {
  font-size: 20px;
}
.input_icon /deep/ li span {
  display: inline-block;
  transform: scale(1);
}
.input_icon /deep/ li:hover span {
  display: inline-block;
  transform: scale(1.5);
}
.input_icon /deep/ li span {
  transition: transform 1s;
}
</style>
