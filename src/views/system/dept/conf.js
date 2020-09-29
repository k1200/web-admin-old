import { fn_util__deep_clone, handleTree } from '@/util/util';
import {
  fn_api__system_dept_save,
  fn_api__system_dept_update,
  fn_api__system_dept_del,
  fn_api__system_dept_list
} from '@/api/system/dept';
export default {
  name: 'DeptTable',
  components: {},
  computed: {
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
      // 查询参数
      query_params: {
        deptName: undefined,
        status: undefined
      },
      // 表格数据
      tableData: [],
      submit_loading: false, // 弹窗表单提交按钮loading
      // 表单参数
      form: { status: '0' },
      // 表单校验
      rules: {
        deptName: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '菜单顺序不能为空', trigger: 'blur' }
        ],
        email: [
          {
            type: 'email',
            message: "'请输入正确的邮箱地址",
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          {
            pattern: /^1[^012][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      },
      // 状态数据字典
      status_dict: [
        {
          value: '0',
          label: '正常'
        },
        {
          value: '1',
          label: '停用'
        }
      ]
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
        fn_api__system_dept_list(this.fn_format__reqdata(form))
          .then(res => {
            this.tableData = this.fn_format__resdata(res.data);
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
      return this.util.fn_util__filter_null(form);
    },
    // 格式化响应数据
    fn_format__resdata(data) {
      return handleTree(data, 'deptId');
    },

    // 搜索数据
    fn_handle__query_list() {
      this.page.currentPage = 1;
      this.fn_handle__get_list();
    },
    // 重置搜索条件
    fn_click__reset_search() {
      this.query_params = {
        deptName: undefined,
        status: undefined
      };
      this.page.currentPage = 1;
    },

    // 刷新数据
    fn_click__refresh() {
      this.fn_handle__get_list();
    },

    // 打开新增数据弹窗
    fn_click__add_dialog(row) {
      this.form.parentId = row.deptId;
      this.dialog_visible = true;
    },
    // 打开修改数据弹窗
    fn_click__edit_dialog(row) {
      console.log(row);
      this.form = { ...row };
      this.dialog_visible = true;
    },
    // 删除数据
    fn_click__del(ids) {
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
          fn_api__system_dept_del(ids)
            .then(res => {
              if (res.code === 200) {
                this.fn_handle__get_list();
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
          let [fn_submit, message] = [fn_api__system_dept_save, '新增成功！'];
          if (this.form.deptId) {
            fn_submit = fn_api__system_dept_update;
            message = '修改成功！';
          }
          fn_submit({ parentId: 0, ...this.form })
            .then(async res => {
              if (res.code === 200) {
                await this.fn_handle__get_list();
                this.dialog_visible = false;
                this.submit_loading = false;
                this.$message.success(message);
              }
            })
            .catch(error => {
              console.log(error);
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
      this.form = { status: '0' };
    },

    // 状态字典翻译
    fn_format__status(row, column, cellValue) {
      let status = this.status_dict.find(item => item.value === cellValue);
      return status ? status.label : 'cellValue';
    },

    parentIdChange(data) {
      console.log(data);
    }
  }
};
