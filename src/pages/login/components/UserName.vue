<template>
  <el-form
    :model="loginForm"
    v-error-focus="validateState"
    label-position="top"
    status-icon
    :rules="rules"
    ref="loginForm"
    class="userLogin"
  >
    <el-form-item label="用户名" prop="username">
      <el-input
        v-model="loginForm.username"
        placeholder="请输入账号"
        @keyup.enter.native="fn_submit__form('loginForm')"
        @input="loginForm.username = loginForm.username.replace(/\s/g, '')"
      />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginForm.password"
        prop="password"
        placeholder="请输入密码"
        @keyup.enter.native="fn_submit__form('loginForm')"
        @input="
          loginForm.password = loginForm.password.replace(
            /\s|[\u4e00-\u9fa5]/g,
            ''
          )
        "
      />
    </el-form-item>
    <el-form-item prop="code">
      <el-input
        @keyup.enter.native="fn_submit__form('loginForm')"
        v-model="loginForm.code"
        autocomplete="off"
        maxlength="6"
        placeholder="请输入验证码"
      >
        <!-- <el-button
          type="text"
          :disabled="!canGetcode"
          slot="append"
          class="get-code"
          :class="canGetcode ? 'canGetcode' : ''"
          @click.stop="getCode"
          @input="loginForm.code = loginForm.code.replace(/\s/g, '')"
          >{{ codeTip }}</el-button
        > -->
        <img
          slot="append"
          @click.stop="fn_click__getCaptchaImage"
          :src="codeUrl"
          class="login-code__img"
        />
      </el-input>
    </el-form-item>
    <el-form-item class="login-submit">
      <el-button
        class="login-btn"
        type="primary"
        @click="fn_submit__form('loginForm')"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { fn_api__get__code } from '@/api/login';
const validateUserName = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入账号'));
  } else {
    callback();
  }
};
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    callback();
  }
};

export default {
  name: 'UserLogin',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin123',
        code: '',
        uuid: ''
      },
      codeUrl: '',
      canGetcode: false,
      codeTip: '获取验证码',
      rules: {
        username: [{ validator: validateUserName, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
        // code: [
        //   {
        //     required: true,
        //     message: '请输入验证码',
        //     trigger: 'blur'
        //   }
        //   // { min: 6, message: '验证码长度为6位', trigger: 'blur' }
        // ]
      },
      validateState: true
    };
  },
  created() {
    this.fn_click__getCaptchaImage();
  },
  methods: {
    fn_click__getCaptchaImage() {
      fn_api__get__code().then(res => {
        this.codeUrl = 'data:image/gif;base64,' + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    fn_submit__form(formName) {
      let refs = this.$refs;
      refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('fn_a_user__handle_login', this.loginForm)
            .then(() => {
              this.$router.replace('/');
            })
            .catch(() => {
              this.fn_click__getCaptchaImage();
            });
        } else {
          this.validateState = !this.validateState;
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login-btn {
  width: 100%;
}
.userLogin {
  /deep/ {
    .el-input-group__append {
      background: none;
      border: none;
      padding: 0;
      position: absolute;
      top: 0;
      right: 85px;
    }
    .el-form-item__label {
      color: #a8a8a8;
      line-height: initial;
    }
    .el-input__inner {
      border: none;
      border-bottom: 1px solid #a8a8a8;
      border-radius: 0;
      padding: 0;
      transition: none;
    }
  }
}
.login-code__img {
  height: 32px;
}
</style>
