<template>
  <el-autocomplete
    popper-class="input_tree"
    v-model="filter_value"
    :fetch-suggestions="fn_query_search"
    :placeholder="placeholder"
    @blur="fn_autocomplete_blur"
    @focus="fn_autocomplete_focus"
    :trigger-on-focus="triggerOnFocus"
    :size="size"
    ref="autocomplete"
    style="width: 100%"
  >
    <template slot-scope="{ item }">
      <el-tree
        ref="tree"
        :data="item"
        :props="props"
        accordion
        :node-key="$attrs['node-key']"
        :filter-node-method="fn_filter_node"
        :expand-on-click-node="false"
        :check-on-click-node="true"
        :highlight-current="true"
        :default-checked-keys="tree_value"
        @node-click="fn_click_node"
      ></el-tree>
    </template>
  </el-autocomplete>
</template>
<script>
import { fn_util__find_to_deep, fn_util__find_deep } from '@/util/util';
export default {
  name: 'InputTree',
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    props: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label'
        };
      }
    },
    value: {
      type: [String, Number],
      default: ''
    },
    // 祖先链
    ancestors: {
      type: [String, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择内容'
    },
    size: {
      type: String,
      default: 'small'
    },
    triggerOnFocus: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 默认选中节点的key值
    tree_value() {
      if (this.value) {
        return [this.value];
      } else {
        return [];
      }
    },
    // 待选数据
    restaurants() {
      return [this.options];
    },
    key() {
      return this.$attrs['node-key'] || this.props['label'];
    }
  },
  data() {
    return {
      filter_value: '', // el-autocomplete 输入值
      selected: null, // 选中数据
      is_focus: false // el-autocomplete 是否获得焦点
    };
  },
  created() {
    this.fn_util__find_deep();
  },
  methods: {
    fn_query_search(queryString, cb) {
      // 调用 callback 返回建议列表的数据
      cb(this.restaurants);
    },
    // 节点被点击时的回调
    // 如果有传入 node-key 返回node-key; 否则返回 label
    fn_click_node(data) {
      this.$emit('input', data[this.key]);
      this.$emit('change', data);
      this.selected = data;
      this.$refs.autocomplete.activated = false;
    },
    fn_filter_node(value, data) {
      if (!value) return true;
      return data[this.props.label].indexOf(value) !== -1;
    },
    // el-autocomplete 获得焦点
    fn_autocomplete_focus() {
      this.is_focus = true;
    },
    // el-autocomplete 失去焦点
    fn_autocomplete_blur() {
      this.is_focus = false;
      if (this.selected) {
        this.filter_value = this.selected[this.props.label];
      } else {
        this.filter_value = '';
      }
      this.$refs.tree.filter();
    },
    // 查询目标对象
    fn_util__find_deep() {
      let temp_res = null;
      if (this.ancestors) {
        temp_res = fn_util__find_to_deep(
          this.options,
          this.ancestors,
          this.key,
          this.props.children
        );
      } else if (this.value) {
        temp_res = fn_util__find_deep(
          this.options,
          this.value,
          this.key,
          this.props.children
        );
      }
      if (temp_res) {
        this.selected = temp_res.slice(-1)[0];
      } else {
        this.selected = null;
      }
    }
  },
  watch: {
    filter_value(val) {
      if (this.is_focus) {
        this.$refs.tree.filter(val);
      }
    },
    tree_value(val) {
      if (!val.length) {
        this.selected = [];
        this.$refs.tree && this.$refs.tree.setCheckedKeys([]);
      } else {
        this.fn_util__find_deep();
      }
    },
    selected(val) {
      if (val) {
        this.filter_value = val[this.props.label];
      } else {
        this.filter_value = '';
      }
    }
  }
};
</script>
<style lang="scss">
.input_tree li:hover,
.input_tree .el-tree-node__content:hover {
  background: none;
}
</style>
