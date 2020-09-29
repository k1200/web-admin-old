<template>
  <div class="login">
    <div class="webLogin">
      <div class="login-box">
        <div class="login_title">
          <h4>
            <div>你好！</div>
            <div>欢迎来到{{ title }}</div>
          </h4>
        </div>
        <div class="login_form">
          <user-name />
        </div>
        <div class="login_footer">
          <el-row type="flex" justify="space-between">
            <router-link to="/register">立即注册</router-link>
            <router-link to="/forgetPass">忘记密码</router-link>
          </el-row>
          <!-- <el-row style="margin-top: 12px" type="flex" justify="flex-end">
            <span>—— 第三方登录</span>
          </el-row> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import website from '@/conf/website';
import UserName from './components/UserName';
export default {
  name: 'Login',
  components: {
    UserName
  },
  computed: {
    title() {
      return website.title;
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/images/login/bg.png');
  background-size: cover;
  background-position: center;
}
.webLogin {
  margin: auto;
  border-radius: 1vw;
  background: #fff;
  position: absolute;
  padding: 5vw 4vw;
  top: 50%;
  right: 12vw;
  transform: translateY(-50%);
}

.login-box {
  white-space: nowrap;
}
.login_title {
  letter-spacing: 5px;
  font-size: 1.4vw;
  white-space: nowrap;
  margin-bottom: 24px;
}
.login_title::after {
  content: '';
  display: block;
  width: 16%;
  height: 3px;
  background-color: $color;
  margin-top: 0.8vw;
}
.login_form {
  padding: 2.5vh 0 0;
}
.login_footer {
  font-size: 12px;
  color: #484545;
  padding: 0 12px;
}
@media screen and (max-width: 800px) {
  .webLogin {
    font-size: 16px;
    width: 85%;
    right: 0;
    left: 0;
    padding: 60px 30px;
  }
  .login_title {
    font-size: 16px;
  }
}
</style>
