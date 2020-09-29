import {
  fn_api__system_post_list,
  fn_api__system_post_del,
  fn_api__system_post_update,
  fn_api__system_post_save
} from '@/api/system/post';
export default {
  name: 'PostTable',
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
      ref_form: null, // 弹窗表单DOM
      // 数据加载层
      loading: false,
      // 表格尺寸
      size: 'small',
      // 是否显示弹出层
      dialog_visible: false,
      // 查询参数（搜索表单）
      query_params: {
        postCode: '',
        postName: '',
        status: ''
      },
      // 分页参数
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 80]
      },
      tableData: [], // 表格数据
      // 选择框字典
      status_dict: [
        {
          label: '正常',
          value: '0'
        },
        {
          label: '停用',
          value: '1'
        }
      ],
      submit_loading: false, // 弹窗表单提交按钮loading
      // 弹窗表单
      form: {
        postName: '',
        postCode: '',
        postSort: '',
        status: '',
        remark: ''
      },
      // 弹窗表单校验规则
      rules: {
        postName: [
          { required: true, message: '岗位名称不能为空', trigger: 'blur' }
        ],
        postCode: [
          { required: true, message: '岗位编码不能为空', trigger: 'blur' }
        ],
        postSort: [
          { required: true, message: '岗位顺序不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.fn_handle__get_list();
  },
  mounted() {
    this.ref_table = this.$refs.table;
    this.ref_form = this.$refs.form;
  },
  methods: {
    // 获取数据
    async fn_handle__get_list(form = this.query_params) {
      this.loading = true;
      new Promise(resolve => {
        fn_api__system_post_list(this.fn_format__reqdata(form))
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
        postCode: '',
        postName: '',
        status: ''
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

    // 打开新增数据弹窗
    fn_click__add_dialog() {
      this.dialog_visible = true;
    },
    // 打开修改数据弹窗
    fn_click__edit_dialog(row) {
      this.form = { ...row };
      this.dialog_visible = true;
    },
    // 删除数据
    fn_click__del(ids) {
      console.log(ids);
      if (typeof ids !== 'string' && ids.length === 0) {
        return this.$message.warning('请至少选择一条数据！');
      }
      ids = ids.toString();
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'warning'
      })
        .then(() => {
          fn_api__system_post_del(ids)
            .then(res => {
              if (res.code === 200) {
                this.$message.success('删除成功!');
              }
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message.info('已取消删除');
        });
    },

    // 用于多选表格，清空用户的选择
    fn_click__clear_selection() {
      this.ref_table.clearSelection();
    },

    // 关闭弹窗
    fn_handle__close() {
      this.fn_click__cancel_form();
    },

    // 提交弹窗表单数据
    fn_click__submit_form() {
      this.submit_loading = true;
      this.$refs.form.validate(valid => {
        if (valid) {
          let [fn_submit, message] = [fn_api__system_post_save, '新增成功！'];
          if (this.form.deptId) {
            fn_submit = fn_api__system_post_update;
            message = '修改成功！';
          }
          fn_submit(this.form).then(async res => {
            if (res.code === 200) {
              await this.fn_handle__get_list();
              this.dialog_visible = false;
              this.submit_loading = false;
              this.$message.success(message);
            }
            this.submit_loading = false;
          });
        } else {
          this.submit_loading = false;
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消弹窗表单
    fn_click__cancel_form() {
      this.dialog_visible = false;
      this.form = {};
    },
    // 格式化 状态
    fn_formatter__status(row, column, cellValue) {
      let status = this.status_dict.find(item => item.value === cellValue);
      return status ? status.label : cellValue;
    }
  }
};
