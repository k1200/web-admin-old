import {
  fn_api__system_dict_data_save,
  fn_api__system_dict_data_del,
  fn_api__system_dict_data_update,
  fn_api__system_dict_data_list
} from '@/api/system/dict/data';
import {
  fn_api__system_dict_type_desc,
  fn_api__system_dict_type_list
} from '@/api/system/dict/type';
export default {
  name: 'DictData',
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
      // 查询参数
      query_params: {
        dictName: '',
        dictType: '',
        status: ''
      },
      // 分页参数
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 80]
      },
      tableData: [],
      type_dict: [],
      // 状态数据字典
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
      form: {},
      // 表单校验
      rules: {
        dictLabel: [
          { required: true, message: '数据标签不能为空', trigger: 'blur' }
        ],
        dictValue: [
          { required: true, message: '数据键值不能为空', trigger: 'blur' }
        ],
        dictSort: [
          { required: true, message: '数据顺序不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    const dictId = this.$route.params && this.$route.params.dictId;
    this.fn_get__type(dictId);
    this.fn_get__type_list();
  },
  mounted() {
    this.ref_table = this.$refs.table;
    this.ref_form = this.$refs.form;
  },
  methods: {
    // 获取数据
    async fn_handle__get_list(form = this.query_params) {
      this.loading = true;
      fn_api__system_dict_data_list(this.fn_format__reqdata(form))
        .then(res => {
          this.tableData = this.fn_format__resdata(res);
          this.loading = false;
        })
        .catch(e => {
          this.tableData = [];
          this.loading = false;
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
    /** 查询字典类型详细 */
    fn_get__type(dictId) {
      fn_api__system_dict_type_desc(dictId).then(res => {
        this.query_params.dictType = res.data.dictType;
        this.defaultDictType = res.data.dictType;
        this.fn_handle__get_list();
      });
    },
    /** 查询字典类型列表 */
    fn_get__type_list() {
      fn_api__system_dict_type_list().then(res => {
        this.type_dict = res.rows;
      });
    },
    // 搜索数据
    fn_handle__query_list() {
      this.page.currentPage = 1;
      this.fn_handle__get_list();
    },
    // 重置搜索条件
    fn_click__reset_search() {
      this.query_params = {
        dictName: '',
        dictType: '',
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
    fn_click__del(dictCode) {
      if (Object.prototype.toString.call(dictCode) === '[object Array]') {
        dictCode = dictCode.map(item => item.dictCode).toString();
      }
      if (dictCode || dictCode === 0) {
        this.$confirm(
          `此操作将删除字典编码为${dictCode}的数据, 是否继续?`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            closeOnClickModal: false,
            closeOnPressEscape: false,
            type: 'warning'
          }
        )
          .then(() => {
            fn_api__system_dict_data_del(dictCode).then(res => {
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

    // 用于多选表格，清空用户的选择
    fn_click__clear_selection() {
      this.ref_table.clearSelection();
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
    // 提交弹窗表单数据
    fn_click__submit_form() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let [fn_submit, message] = [
            fn_api__system_dict_data_save,
            '新增成功！'
          ];
          if (this.form.dictId) {
            fn_submit = fn_api__system_dict_data_update;
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
    // 格式化 状态
    fn_formatter__status(row, column, cellValue) {
      let status = this.status_dict.find(item => item.value === cellValue);
      return status ? status.label : cellValue;
    }
  }
};
