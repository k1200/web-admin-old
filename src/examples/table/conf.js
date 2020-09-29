import {
  fn_api__examples_list,
  fn_api__examples_del,
  fn_api__examples_update,
  fn_api__examples_save
} from '@/api/examples';
export default {
  name: 'ExamplesTable',
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
        text: '', // 普通文本
        daterange: [], // 日期范围
        datetimerange: [], // 日期时间范围
        date: '', // 日期
        select: '' // 选择框
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
      select_dict: [
        {
          label: '选择一',
          value: '1'
        },
        {
          label: '选择二',
          value: '2'
        }
      ],
      submit_loading: false, // 弹窗表单提交按钮loading
      // 弹窗表单
      form: {
        text: '', // 普通文本
        number: '', // number
        daterange: [], // 日期范围
        datetimerange: [], // 日期时间范围
        date: '', // 日期
        datetime: '', // 日期时间
        select: '', // 选择框
        switch: false, // Switch开关
        checkbox: [], // 多选框
        radio: '', // 单选框
        textarea: '' // 多行文本
      },
      // 弹窗表单校验规则
      rules: {
        text: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          // {
          //   validator: (rule, value, callback) => {
          //     let reg = new RegExp();
          //     if (!reg.test(value)) {
          //       callback(new Error('输入错误!'));
          //     } else {
          //       callback();
          //     }
          //   },
          //   trigger: 'blur'
          // }
        ],
        number: [
          {
            type: 'number',
            required: true,
            message: '请输入数量',
            trigger: 'blur'
          }
        ],

        daterange: [
          {
            type: 'array',
            required: true,
            message: '请选择日期范围',
            trigger: 'change'
          }
        ],
        datetimerange: [
          {
            type: 'array',
            required: true,
            message: '请选择日期时间范围',
            trigger: 'change'
          }
        ],
        date: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        datetime: [
          {
            type: 'date',
            required: true,
            message: '请选择日期时间',
            trigger: 'change'
          }
        ],
        select: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        checkbox: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        radio: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        textarea: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      checkbox_dict: [
        {
          label: '多选一',
          value: '1'
        },
        {
          label: '多选二',
          value: '2'
        }
      ],
      radio_dict: [
        {
          label: '单选一',
          value: '1'
        },
        {
          label: '单选二',
          value: '2'
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
      return false;
      new Promise(resolve => {
        fn_api__examples_list(this.fn_format__reqdata(form))
          .then(res => {
            this.tableData = this.fn_format__resdata(res.data);
            this.loading = false;
            resolve();
          })
          .catch(e => {
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
      // this.page.total = data.total;
      return data;
    },

    // 搜索数据
    fn_handle__query_list() {
      this.page.currentPage = 1;
      this.fn_handle__get_list();
    },
    // 重置搜索条件
    fn_click__reset_search() {
      this.query_params = {
        text: '',
        daterange: [],
        datetimerange: [],
        date: '',
        select: ''
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
      console.log('fn_click__add');
      this.dialog_visible = true;
    },
    // 打开修改数据弹窗
    fn_click__edit_dialog(row) {
      this.form = { ...row };
      this.dialog_visible = true;
    },
    // 查看数据
    fn_click__view(row) {
      this.form = { ...row };
      this.dialog_visible = true;
    },
    // 删除数据
    fn_click__del(ids) {
      if (Object.prototype.toString.call(ids) === '[object Array]') {
        ids = ids.map(item => item.id).toString();
      }
      if (ids) {
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: 'warning'
        })
          .then(() => {
            this.$message.success('删除成功!');
            return false;
            fn_api__examples_del(ids)
              .then(res => {
                if (res.code === 0) {
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

    // 提交弹窗表单数据
    fn_click__submit_form() {
      this.submit_loading = true;
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form);
          return false;
          let [fn_submit, message] = [fn_api__examples_save, '新增成功！'];
          if (this.form.id) {
            fn_submit = fn_api__examples_update;
            message = '修改成功！';
          }
          fn_submit(this.form).then(async res => {
            if (res.code === '0') {
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
    }
  }
};
