import {
  fn_api__system_operlog_list,
  fn_api__system_operlog_del,
  fn_api__system_operlog_clean
} from '@/api/system/operlog';
export default {
  name: 'operlog',
  components: {},
  computed: {
    // 获取多选表格选中的数据
    c__selection() {
      return this.ref_table ? this.ref_table.selection : [];
    },
    // 权限
    c__permission() {
      return {
        view_btn: true,
        edit_btn: true,
        del_btn: true,
        add_btn: true
      };
    }
  },
  data() {
    return {
      ref_table: null, // 表格DOM
      // 数据加载层
      loading: false,
      // 是否显示弹出层
      dialog_visible: false,
      // 表格尺寸
      size: 'small',
      // 查询参数
      query_params: {
        title: undefined,
        operName: undefined,
        businessType: undefined,
        status: undefined,
        dateRange: []
      },
      // 分页参数
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 80]
      },
      // 表格数据
      tableData: [],
      // 状态数据字典
      status_dict: [
        { value: 0, label: '正常' },
        { value: 1, label: '停用' }
      ],
      type_dict: [
        { value: '1', label: '新增' },
        { value: '2', label: '修改' },
        { value: '3', label: '删除' },
        { value: '4', label: '授权' },
        { value: '5', label: '导出' },
        { value: '6', label: '导入' },
        { value: '7', label: '强退' },
        { value: '8', label: '生成代码' },
        { value: '9', label: '清空数据' }
      ],
      // 表单参数
      form: {}
    };
  },
  created() {
    this.fn_handle__get_list();
  },
  mounted() {
    this.ref_table = this.$refs.table;
  },
  methods: {
    // 获取数据
    async fn_handle__get_list(form = this.query_params) {
      this.loading = true;
      new Promise(resolve => {
        fn_api__system_operlog_list(this.fn_format__reqdata(form))
          .then(res => {
            this.tableData = this.fn_format__resdata(res);
            this.loading = false;
            resolve();
          })
          .catch(() => {
            this.tableData = [];
            this.loading = false;
            resolve();
          });
      });
    },
    // 格式化请求参数
    fn_format__reqdata(form) {
      let data = this.util.fn_util__filter_null(form);
      data.pageNum = this.page.currentPage;
      data.pageSize = this.page.pageSize;
      if (data.dateRange && data.dateRange.length > 0) {
        data.beginTime = data.dateRange[0];
        data.endTime = data.dateRange[1];
      }
      delete data.dateRange;
      return data;
    },
    // 格式化响应数据
    fn_format__resdata(data) {
      this.page.total = data.total;
      return data.rows;
    },

    // 搜索数据
    fn_handle__query_list() {
      this.page.currentPage = 1;
      this.fn_handle__get_list();
    },
    // 重置搜索条件
    fn_click__reset_search() {
      this.query_params = {
        title: undefined,
        operName: undefined,
        businessType: undefined,
        status: undefined,
        dateRange: []
      };
      this.page.currentPage = 1;
    },
    // 更新每页显示条数
    fn_change__size(val) {
      this.page.pageSize = val;
      this.fn_handle__get_list();
    },
    // 更新当前页数
    fn_change__current(val) {
      this.page.currentPage = val;
      this.fn_handle__get_list();
    },
    // 刷新数据
    fn_click__refresh() {
      this.fn_handle__get_list();
    },

    // 删除数据
    fn_click__del(ids) {
      if (Object.prototype.toString.call(ids) === '[object Array]') {
        ids = ids.map(item => item.operId).toString();
      }
      if (ids) {
        this.$confirm(`此操作将删除用户编号为${ids}的数据, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: 'warning'
        })
          .then(() => {
            fn_api__system_operlog_del(ids).then(res => {
              if (res.code === 200) {
                this.fn_handle__get_list();
                this.$message.success('删除成功!');
              }
            });
          })
          .catch(() => {
            this.$message.info('已取消删除！');
          });
      } else {
        this.$message.warning('请至少选择一条数据!');
      }
    },
    fn_click__clearn() {
      this.$confirm(`此操作将清空所有登陆日志的数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'warning'
      })
        .then(() => {
          fn_api__system_operlog_clean().then(res => {
            if (res.code === 200) {
              this.fn_handle__get_list();
              this.$message.success('删除成功!');
            }
          });
        })
        .catch(() => {
          this.$message.info('已取消删除！');
        });
    },
    fn_click__view_dialog(row) {
      this.form = { ...row };
      this.dialog_visible = true;
    },
    // 关闭弹窗
    fn_handle__close() {
      this.fn_click__cancel_form();
    },
    // 取消弹窗表单
    fn_click__cancel_form() {
      this.dialog_visible = false;
      this.form = {};
    },
    // 用于多选表格，清空用户的选择
    fn_click__clear_selection() {
      this.ref_table.clearSelection();
    },
    // 状态字典翻译
    fn_format__status(row, column, cellValue) {
      let status = this.status_dict.find(item => item.value === cellValue);
      return status ? status.label : cellValue;
    },
    // 状态字典翻译
    fn_format__type(row, column, cellValue) {
      let type = this.type_dict.find(item => +item.value === cellValue);
      return type ? type.label : cellValue;
    }
  }
};
