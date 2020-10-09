import { handleTree } from '@/util/util';
import {
  fn_api__system_menu_save,
  fn_api__system_menu_update,
  fn_api__system_menu_del,
  fn_api__system_menu_list
} from '@/api/system/menu';
export default {
  name: 'MenuTable',
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
        menuName: '',
        status: ''
      },
      // 表格数据
      tableData: [],
      // 菜单状态数据字典
      status_dict: [
        {
          value: '0',
          label: '正常'
        },
        {
          value: '1',
          label: '停用'
        }
      ],
      submit_loading: false,
      // 表单参数
      form: { menuType: 'M' },
      // 表单校验
      rules: {
        menuName: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '菜单顺序不能为空', trigger: 'blur' }
        ],
        path: [{ required: true, message: '路由地址不能为空', trigger: 'blur' }]
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
      fn_api__system_menu_list(this.fn_format__reqdata(form))
        .then(res => {
          this.tableData = this.fn_format__resdata(res.data);
          this.loading = false;
        })
        .catch(() => {
          this.tableData = [];
          this.loading = false;
        });
    },
    // 格式化请求参数
    fn_format__reqdata(form) {
      return this.util.fn_util__filter_null(form);
    },
    // 格式化响应数据
    fn_format__resdata(data) {
      return handleTree(data, 'menuId');
    },
    // 搜索数据
    fn_handle__query_list() {
      this.page.currentPage = 1;
      this.fn_handle__get_list();
    },
    // 重置搜索条件
    fn_click__reset_search() {
      this.query_params = {
        menuName: '',
        status: ''
      };
      this.page.currentPage = 1;
    },
    // 刷新数据
    fn_click__refresh() {
      this.fn_handle__get_list();
    },
    // 打开新增数据弹窗
    fn_click__add_dialog(row) {
      if (row) {
        this.form.parentId = row.menuId;
      }
      this.dialog_visible = true;
    },

    // 打开修改数据弹窗
    fn_click__edit_dialog(row) {
      this.form = { ...row };
      this.dialog_visible = true;
    },
    // 删除数据
    fn_click__del(row) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'warning'
      })
        .then(() => {
          fn_api__system_menu_del(row.menuId).then(res => {
            if (+res.code === 200) {
              this.fn_handle__get_list();
              this.$message.success('删除成功!');
            }
          });
        })
        .catch(() => {
          this.$message.info('已取消删除');
        });
    },
    // 关闭弹窗
    fn_handle__close() {
      this.fn_click__cancel_form();
    },
    // 取消弹窗表单
    fn_click__cancel_form() {
      this.dialog_visible = false;
      this.form = { menuType: 'M' };
    },

    // 菜单状态字典翻译
    fn_format__status(row, column, cellValue) {
      if (row.menuType === 'F') {
        return '';
      }
      let status = this.status_dict.find(item => item.value === cellValue);
      return status ? status.label : cellValue;
    },
    // 新增/修改
    fn_click__submit_form() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let [fn_submit, message] = [fn_api__system_menu_save, '新增成功！'];
          if (this.form.menuId) {
            fn_submit = fn_api__system_menu_update;
            message = '修改成功！';
          }
          let is_link = /^https?:\/\/.+/.test(this.form.path);
          let data = { ...this.form };
          if (is_link) {
            data.isFrame = '0';
          }
          fn_submit(data).then(async res => {
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

    parentIdChange(data) {
      console.log(data);
    }
  }
};
