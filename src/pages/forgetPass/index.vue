<template>
  <simple-layout>
    <div class="forgetPass-form-box">
      <h4 class="forgetPass-title">忘记密码</h4>
      <el-row style="height: calc(100% - 70px);">
        <el-scrollbar style="height: 100%;" class="page-scrollbar-hidden-x">
          <el-form
            class="forgetPass-form"
            status-icon
            :rules="forgetPassRules"
            ref="forgetPassForm"
            :model="forgetPassForm"
            label-width="0"
            v-error-focus="validateState"
          >
            <div style="position: absolute; z-index: -1;opacity: 0">
              <input type="text" />
              <input type="password" />
            </div>
            <el-form-item prop="contactNumber">
              <el-input
                class="contactNumber"
                @keyup.enter.native="submit"
                v-model="forgetPassForm.contactNumber"
                auto-complete="off"
                maxlength="11"
                placeholder="请输入手机号码"
                @input="
                  forgetPassForm.contactNumber = forgetPassForm.contactNumber.replace(
                    /[^0-9]/g,
                    ''
                  )
                "
              >
                <el-select
                  class="tel-code"
                  v-model="telCode"
                  slot="prepend"
                  placeholder="请选择"
                  style="width: 80px;"
                >
                  <el-option label="+86" value="86">+86</el-option>
                  <el-option label="+120" value="120">+120</el-option>
                  <el-option label="+107" value="107">+107</el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                @keyup.enter.native="submit"
                v-model="forgetPassForm.code"
                autocomplete="off"
                maxlength="6"
                placeholder="请输入验证码"
                @input="
                  forgetPassForm.code = forgetPassForm.code.replace(/\s/g, '')
                "
              >
                <el-button
                  type="text"
                  :disabled="!canGetcode"
                  slot="append"
                  class="get-code"
                  :class="canGetcode ? 'canGetcode' : ''"
                  @click.stop="getCode"
                  >{{ codeTip }}</el-button
                >
              </el-input>
            </el-form-item>
            <el-form-item prop="password" ref="password">
              <el-input
                @keyup.enter.native="submit"
                :type="showPassword ? 'text' : 'password'"
                v-model="forgetPassForm.password"
                auto-complete="off"
                maxlength="15"
                placeholder="请输入新密码"
                @input="
                  forgetPassForm.password = forgetPassForm.password.replace(
                    /\s|[\u4e00-\u9fa5]/g,
                    ''
                  )
                "
              >
                <i
                  class="el-icon-view el-input__icon"
                  :class="showPassword ? 'font-color' : ''"
                  slot="suffix"
                  @click="showPassword = !showPassword"
                ></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="nextPassword" ref="nextPassword">
              <el-input
                @keyup.enter.native="submit"
                :type="showNextPassword ? 'text' : 'password'"
                v-model="forgetPassForm.nextPassword"
                autocomplete="off"
                maxlength="15"
                placeholder="请再次输入新密码"
                @input="
                  forgetPassForm.password = forgetPassForm.password.replace(
                    /\s[\u4e00-\u9fa5]/g,
                    ''
                  )
                "
              >
                <i
                  class="el-icon-view el-input__icon"
                  :class="showNextPassword ? 'font-color' : ''"
                  slot="suffix"
                  @click="showNextPassword = !showNextPassword"
                ></i>
              </el-input>
            </el-form-item>
            <el-form-item style="margin: 28px 0 0 0">
              <el-button
                type="primary"
                @click.native.prevent="submit"
                class="forgetPass-submit"
                >提 交
              </el-button>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </el-row>
    </div>
  </simple-layout>
</template>
<script>
export default {
  name: 'ForgetPass',
  data() {
    return {
      passwordType: 'password',
      nextPasswordType: 'password',
      checked: false,
      time: 0,
      showPassword: false,
      showNextPassword: false,
      canGetcode: false,
      codeTip: '获取验证码',
      telCode: '86',
      forgetPassForm: {
        password: '',
        nextPassword: '',
        contactNumber: '',
        code: ''
      },
      validateState: true,

      forgetPassRules: {
        password: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
          { validator: this.validatePass, trigger: 'blur' }
        ],
        nextPassword: [
          {
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
          },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
          { validator: this.validatePass2, trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, validator: this.validatePhone, trigger: 'blur' }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          },
          { min: 6, message: '验证码长度为6位', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    validatePhone(rule, value, callback) {
      let reg = /^1[3456789]\d{9}$/;
      if (value === '') {
        this.canGetcode = false;
        callback(new Error('请输入手机号'));
      } else if (!reg.test(value)) {
        this.canGetcode = false;
        callback(new Error('手机号格式错误!'));
      } else {
        this.canGetcode = true;
        callback();
      }
    },
    validatePass(rule, value, callback) {
      let reg = /(\d[^\d]+)|([A-z][^A-z]+)/;
      let $forgetPassForm = this.forgetPassForm;
      if (reg.test(value)) {
        if ($forgetPassForm.nextPassword) {
          if (value !== $forgetPassForm.nextPassword) {
            callback(new Error('两次输入密码不一致!'));
          }
          $forgetPassForm.nextPassword = $forgetPassForm.nextPassword || '';
          let nextPassword = this.$refs.nextPassword;
          nextPassword.validateState = 'success';
        }
        callback();
      } else {
        callback(new Error('密码应至少包含两种不同类型的值!'));
      }
    },
    validatePass2(rule, value, callback) {
      let reg = /(\d[^\d]+)|([A-z][^A-z]+)/;
      let $forgetPassForm = this.forgetPassForm;
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (!reg.test(value)) {
        callback(new Error('密码应至少包含两种不同类型的值!'));
      } else if (value !== $forgetPassForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        let password = this.$refs.password;
        password.validateState = 'success';
        callback();
      }
    },

    getCode() {
      // forget_pass({ username: this.forgetPassForm.contactNumber }).then(res =>
      //   console.log(res)
      // );
    },
    supplierAgreement() {},
    submit() {
      let forgetPassForm = this.$refs.forgetPassForm;
      forgetPassForm.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          this.validateState = !this.validateState;
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.forgetPass-container {
  height: 100%;
}
.simpleHeader {
  width: 100%;
  background-color: #fff;
  @media screen and (min-width: 851px) {
    height: 80px !important;
    line-height: 80px;
  }
  @media screen and (min-width: 750px) and (max-width: 850px) {
    height: 60px !important;
    line-height: 60px;
  }
}
.forgetPass-form-box {
  width: $width;
  margin: auto;
  background-color: #fff;
  padding: 32px 0;
  height: 100%;
  .tel-code {
    /deep/ .el-input__validateIcon {
      display: none !important;
    }
  }
  @media screen and (min-width: 750px) and (max-width: 1080px) {
    width: 700px;
  }
  @media screen and (min-width: 500px) and (max-width: 750px) {
    width: 500px;
    padding: 12px 0;
  }
  @media screen and (max-width: 499px) {
    width: 90%;
    padding-bottom: 0;
  }
}
.forgetPass-form {
  width: 365px;
  margin: auto;
  text-align: center;
  @media screen and (max-width: 499px) {
    width: 90%;
  }
}
.forgetPass-title {
  color: $color;
  margin-bottom: 40px;
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  letter-spacing: 4px;
  @media screen and (max-width: 750px) {
    margin-bottom: 28px;
    font-size: 18px;
  }
}
.forgetPass-submit {
  width: 100%;
}
.toLogin {
  color: $color;
  text-decoration: $color;
  text-decoration-line: underline;
}
.get-code {
  margin: 0 -20px;
  padding: 0 20px;
  line-height: 38px;
}
.el-icon-view.el-input__icon {
  cursor: pointer;
}
.canGetcode {
  background: $color !important;
  color: #fff !important;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
