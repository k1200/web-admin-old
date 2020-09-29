import { fn_api__examples_update, fn_api__examples_save } from '@/api/examples';
export default {
  name: 'ExampleForm',
  data() {
    return {
      submit_loading: false,
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
  methods: {
    // 提交弹窗表单数据
    fn_click_submit_form() {
      this.submit_loading = true;
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form);
          this.submit_loading = false;
          return false;
          let [fn_submit, message] = [fn_api__examples_save, '新增成功！'];
          if (this.form.id) {
            fn_submit = fn_api__examples_update;
            message = '修改成功！';
          }
          fn_submit(this.form).then(res => {
            if (res.code === '0') {
              this.submit_loading = false;
              this.$message.success(message);
            }
          });
        } else {
          console.log('error submit!!');
          this.submit_loading = false;
          return false;
        }
      });
    },
    // 弹窗表单重置清空
    fn_click_reset_form() {
      this.$refs.form.resetFields();
    }
  }
};
