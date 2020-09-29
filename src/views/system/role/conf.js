import {
  fn_api__system_role_list,
  fn_api__system_role_del,
  fn_api__system_role_update,
  fn_api__system_role_save,
  fn_api__system_role_changeStatus,
  fn_api__system_role_dataScope
} from '@/api/system/role';
import {
  fn_api__system_menu_treeselect,
  fn_api__system_menu_roleMenuTreeselect
} from '@/api/system/menu';
import {
  fn_api__system_dept_treeselect,
  fn_api__system_dept_roleDeptTreeselect
} from '@/api/system/dept';
export default {
  name: 'RoleTable',
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
        roleName: '',
        roleKey: '',
        status: '',
        dateRange: []
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
      data_scope_dict: [
        {
          value: '1',
          label: '全部数据权限'
        },
        {
          value: '2',
          label: '自定数据权限'
        },
        {
          value: '3',
          label: '本部门数据权限'
        },
        {
          value: '4',
          label: '本部门及以下数据权限'
        },
        {
          value: '5',
          label: '仅本人数据权限'
        }
      ],
      // 菜单列表
      menu_tree: [],
      // 部门列表
      dept_tree: [],
      submit_loading: false, // 弹窗表单提交按钮loading
      // 弹窗表单
      form: {
        roleName: '',
        roleCode: '',
        roleSort: '',
        status: '',
        remark: ''
      },
      active_form: 'role', // 当前活动表单类型[role, role_data_scope]
      // 弹窗表单校验规则
      rules: {
        roleName: [
          { required: true, message: '岗位名称不能为空', trigger: 'blur' }
        ],
        roleCode: [
          { required: true, message: '岗位编码不能为空', trigger: 'blur' }
        ],
        roleSort: [
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
        fn_api__system_role_list(this.fn_format__reqdata(form))
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
        roleCode: '',
        roleName: '',
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
      this.fn_get__menu_tree();
      this.dialog_visible = true;
    },
    // 打开修改数据弹窗
    fn_click__edit_dialog(row) {
      const roleMenu = this.fn_get__rolemenu_tree(row.roleId);
      this.active_form = 'role';
      this.form = { ...row };
      this.dialog_visible = true;
      this.$nextTick(() => {
        roleMenu.then(res => {
          this.$refs.menu.setCheckedKeys(res.checkedKeys);
        });
      });
    },
    // 数据范围修改弹窗
    fn_click__data_dialog(row) {
      const roleDeptTreeselect = this.fn_get__roledept_tree(row.roleId);
      this.active_form = 'role_data_scope';
      this.form = { ...row };
      this.dialog_visible = true;
      this.$nextTick(() => {
        roleDeptTreeselect.then(res => {
          this.$refs.dept.setCheckedKeys(res.checkedKeys);
        });
      });
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
          fn_api__system_role_del(ids)
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
      if (this.active_form === 'role') {
        this.fn_submit__role_form();
      } else if (this.active_form === 'role_data_scope') {
        this.fn_submit_datascope_form();
      }
    },
    fn_submit__role_form() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let [fn_submit, message] = [fn_api__system_role_save, '新增成功！'];
          if (this.form.roleId) {
            fn_submit = fn_api__system_role_update;
            message = '修改成功！';
          }
          let menuIds = this.fn_get__menu_all_checked();
          fn_submit({ ...this.form, menuIds }).then(async res => {
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
    fn_submit_datascope_form() {
      let deptIds = this.fn_get__menu_all_checked();
      fn_api__system_role_dataScope({ ...this.form, deptIds }).then(
        async res => {
          if (res.code === 200) {
            await this.fn_handle__get_list();
            this.dialog_visible = false;
            this.submit_loading = false;
            this.$message.success('数据权限修改成功！');
          }
          this.submit_loading = false;
        }
      );
    },
    // 取消弹窗表单
    fn_click__cancel_form() {
      this.dialog_visible = false;
      this.form = {};
      let ref = 'menu';
      if (this.active_form === 'role_data_scope') {
        ref = 'dept';
      }
      this.$refs[ref].setCheckedKeys([]);
    },
    // 格式化 状态
    fn_formatter__status(row, column, cellValue) {
      let status = this.status_dict.find(item => item.value === cellValue);
      return status ? status.label : cellValue;
    },

    // 查询菜单树结构
    fn_get__menu_tree() {
      fn_api__system_menu_treeselect().then(res => {
        this.menu_tree = res.data;
      });
    },
    // 根据角色ID查询菜单树结构
    fn_get__rolemenu_tree(roleId) {
      return fn_api__system_menu_roleMenuTreeselect(roleId).then(res => {
        this.menu_tree = res.menus;
        return res;
      });
    },
    // 查询部门树结构
    fn_get__dept_tree() {
      fn_api__system_dept_treeselect().then(res => {
        this.dept_tree = res.data;
      });
    },
    // 根据角色ID查询部门树结构
    fn_get__roledept_tree(roleId) {
      return fn_api__system_dept_roleDeptTreeselect(roleId).then(res => {
        this.dept_tree = res.depts;
        return res;
      });
    },
    // 获取所有选中菜单节点数据
    fn_get__menu_all_checked() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getHalfCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    // 获取所有选中部门节点数据
    fn_get__dept_all_checked() {
      // 目前被选中的部门节点
      let checkedKeys = this.$refs.dept.getHalfCheckedKeys();
      // 半选中的部门节点
      let halfCheckedKeys = this.$refs.dept.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },

    // 角色状态修改
    fn_chenge__status(row) {
      let text = row.status === '0' ? '启用' : '停用';
      this.$confirm(`确认要${text}${row.roleName}角色吗?`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return fn_api__system_role_changeStatus(row.roleId, row.status);
        })
        .then(() => {
          this.$message.success(text + '成功');
        })
        .catch(function() {
          row.status = row.status === '0' ? '1' : '0';
        });
    }
  }
};
