<template>
  <div class="top-right">
    <i
      v-if="message"
      class="el-icon-message"
      style="font-size: 25px;cursor: pointer"
    ></i>
    <div class="top-right__user">
      <el-dropdown>
        <div class="el-dropdown-link">
          <img
            class="top-right__img"
            :src="
              userInfo.avatar ||
                'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
            "
            alt=""
            width="30"
            height="30"
          />
          {{ userInfo.nickName }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { MUTATIONS_TAG__CLEARALL } from '@/store/mutations_type';
import website from '@/conf/website';
export default {
  name: 'TopRight',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['userInfo']),
    message() {
      return website.header_message;
    }
  },
  methods: {
    logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('fn_a_user__handle_logout').then(() => {
          this.$store.commit(MUTATIONS_TAG__CLEARALL);
          this.$router.push('/login');
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.top-right {
  display: flex;
  align-items: center;
}
.top-right__user {
  margin-left: 8px;
}
.top-right__img {
  padding: 2px;
  border-radius: 50%;
  border: 1px solid #fff;
  vertical-align: middle;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
</style>
