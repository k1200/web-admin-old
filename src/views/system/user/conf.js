import {
  fn_api__system_user_save,
  fn_api__system_user_del,
  fn_api__system_user_update,
  fn_api__system_user_list,
  fn_api__system_user_resetPwd,
  fn_api__system_user_changeStatus,
  fn_api__system_user
} from '@/api/system/user';
import { fn_api__system_dept_treeselect } from '@/api/system/dept';
export default {
  name: 'UserTable',
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
        userName: '',
        phonenumber: '',
        status: '',
        deptId: '',
        dateRange: []
      },
      // 分页参数
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 80]
      },
      tableData: [],
      // 默认密码
      initPassword: '123456',
      // 状态数据字典
      status_dict: [
        {
          label: '正常',
          value: '0'
        },
        {
          label: '停用',
          value: '1'
        },
        {
          label: '未知',
          value: '2'
        }
      ],
      // 性别状态字典
      sex_dict: [
        {
          label: '男',
          value: '0'
        },
        {
          label: '女',
          value: '1'
        },
        {
          label: '未知',
          value: '2'
        }
      ],
      post_dict: [], // 岗位选项
      role_dict: [], // 角色选项
      dept_dict: [],
      submit_loading: false, // 弹窗表单提交按钮loading
      // 弹窗表单
      form: {},
      // 表单校验
      rules: {
        userName: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '用户昵称不能为空', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '归属部门不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用户密码不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
          {
            type: 'email',
            message: "'请输入正确的邮箱地址",
            trigger: ['blur', 'change']
          }
        ],
        phonenumber: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: /^1[^012][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {
    this.fn_handle__get_list();
    this.fn_handle__get_dept();
  },
  mounted() {
    this.ref_table = this.$refs.table;
    this.ref_form = this.$refs.form;
  },
  methods: {
    // 获取数据
    async fn_handle__get_list(form = this.query_params) {
      this.loading = true;
      fn_api__system_user_list(this.fn_format__reqdata(form)).then(res => {
        this.tableData = this.fn_format__resdata(res);
        this.loading = false;
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
        userName: '',
        phonenumber: '',
        status: '',
        deptId: '',
        dateRange: []
      };
      this.page.currentPage = 1;
    },
    // 获取部门
    fn_handle__get_dept() {
      this.loading = true;
      fn_api__system_dept_treeselect().then(res => {
        this.dept_dict = res.data;
      });
    },
    // 获取用户信息（角色，岗位数据）
    fn_handle__get_user(form = this.query_params) {
      this.loading = true;
      fn_api__system_user(this.fn_format__reqdata(form)).then(res => {
        this.tableData = this.fn_format__resdata(res);
        this.loading = false;
      });
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
      fn_api__system_user().then(res => {
        this.post_dict = res.posts;
        this.role_dict = res.roles;
        this.dialog_visible = true;
        this.form.password = this.initPassword;
      });
    },
    // 打开修改数据弹窗
    fn_click__edit_dialog(row) {
      fn_api__system_user(row.userId).then(res => {
        this.post_dict = res.posts;
        this.role_dict = res.roles;
        this.form = {
          ...res.data,
          postIds: res.postIds,
          roleIds: res.roleIds
        };
        this.dialog_visible = true;
        this.form.password = '';
      });
    },

    // 删除数据
    fn_click__del(userIds) {
      if (Object.prototype.toString.call(userIds) === '[object Array]') {
        userIds = userIds.map(item => item.userId).toString();
      }
      if (userIds) {
        this.$confirm(
          `此操作将删除用户编号为${userIds}的数据, 是否继续?`,
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
            fn_api__system_user_del(userIds).then(res => {
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
      this.$refs.user_form.validate(valid => {
        if (valid) {
          let [fn_submit, message] = [fn_api__system_user_save, '新增成功！'];
          if (this.form.userId) {
            fn_submit = fn_api__system_user_update;
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
    // 密码重置
    fn_click__reset_password(row) {
      this.$confirm('此操作将重置用户密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          fn_api__system_user_resetPwd({
            userId: row.userId,
            password: this.initPassword
          }).then(res => {
            if (res.code === 200) {
              this.$message.success('密码重置成功！');
            }
          });
        })
        .catch(() => {
          this.$message.info('已取消密码重置！');
        });
    },
    // 修改用户状态
    fn_change__status(row) {
      this.$confirm('此操作将停用该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          fn_api__system_user_changeStatus({
            userId: row.userId,
            status: row.status
          })
            .then(res => {
              if (res.code === 200) {
                this.$message.success('用户停用成功！');
              }
            })
            .catch(() => {
              row.status = row.status === '0' ? '1' : '0';
            });
        })
        .catch(() => {
          this.$message.info('已取消操作！');
        });
    }
  }
};
