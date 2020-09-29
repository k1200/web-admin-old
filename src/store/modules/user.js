import {
  fn_api__handle__auth_oauth_token,
  fn_api__handle__auth_oauth_refresh_token,
  fn_api__handle__logout,
  fn_api__get__info,
  fn_api__get__routers
} from '@/api/login';
import {
  fn_token__get,
  fn_refreshToken__get,
  fn_token__set,
  fn_refreshToken__set,
  fn_token__remove,
  fn_refreshToken__remove
} from '@/util/token';
import {
  fn_storage__set,
  fn_storage__get,
  fn_storage__clear
} from '@/util/storage';
import { fn_store__format_routers } from '../util';
import {
  MUTATIONS_USER__SET_TOKEN,
  MUTATIONS_USER__REMOVE_TOKEN,
  MUTATIONS_USER__SET_REFRESHTOKEN,
  MUTATIONS_USER__REMOVE_REFRESHTOKEN,
  MUTATIONS_USER__SET_USERINFO,
  MUTATIONS_USER__CLEAR_USERINFO,
  MUTATIONS_USER__SET_ROUTER,
  MUTATIONS_USER__CLEAR_ROUTER,
  MUTATIONS_USER__SET_ROLES,
  MUTATIONS_USER__CLEAR_ROLES,
  MUTATIONS_USER__SET_PERMISSION,
  MUTATIONS_USER__CLEAR_PERMISSION,
  MUTATIONS_USER__SET_MENU,
  MUTATIONS_USER__CLEAR_MENU,
  MUTATIONS_USER__CLEAR
} from '@/store/mutations_type';
const user = {
  state: () => {
    return {
      token: fn_token__get() || '',
      refreshToken: fn_refreshToken__get() || '',
      roles: fn_storage__get('roles') || [],
      userInfo: null,
      permissions: fn_storage__get('permissions') || [],
      routes: fn_storage__get('routes') || [],
      menu: fn_storage__get('menu') || []
    };
  },
  mutations: {
    [MUTATIONS_USER__SET_TOKEN](state, val) {
      state.token = val;
    },
    [MUTATIONS_USER__REMOVE_TOKEN](state) {
      state.token = '';
    },

    [MUTATIONS_USER__SET_REFRESHTOKEN](state, val) {
      state.refreshToken = val;
    },
    [MUTATIONS_USER__REMOVE_REFRESHTOKEN](state) {
      state.refreshToken = '';
    },

    [MUTATIONS_USER__SET_USERINFO](state, val) {
      state.userInfo = val;
    },
    [MUTATIONS_USER__CLEAR_USERINFO](state) {
      state.userInfo = null;
    },

    [MUTATIONS_USER__SET_ROUTER](state, val) {
      state.routes = val;
    },
    [MUTATIONS_USER__CLEAR_ROUTER](state) {
      state.routes = [];
    },

    [MUTATIONS_USER__SET_PERMISSION](state, val) {
      state.permissions = val;
    },
    [MUTATIONS_USER__CLEAR_PERMISSION](state) {
      state.permissions = [];
    },

    [MUTATIONS_USER__SET_ROLES](state, val) {
      state.roles = val;
    },
    [MUTATIONS_USER__CLEAR_ROLES](state) {
      state.roles = [];
    },

    [MUTATIONS_USER__SET_MENU](state, val) {
      state.menu = val;
    },
    [MUTATIONS_USER__CLEAR_MENU](state) {
      state.menu = [];
    },
    [MUTATIONS_USER__CLEAR](state) {
      state.token = '';
      state.refreshToken = '';
      state.userInfo = null;
      state.routes = [];
      state.permissions = [];
      state.roles = [];
      state.menu = [];
    }
  },
  actions: {
    fn_a_user__handle_login({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        fn_api__handle__auth_oauth_token(data)
          .then(res => {
            fn_token__set(res.access_token || res.token, res.expires_in);
            fn_refreshToken__set(res.refresh_token, res.expires_in);
            commit(MUTATIONS_USER__SET_TOKEN, res.access_token || res.token);
            commit(MUTATIONS_USER__SET_REFRESHTOKEN, res.refresh_token);
            Promise.all([
              dispatch('fn_a_user__get_info'),
              dispatch('fn_a_user__get_routers')
            ]).then(() => {
              resolve();
            });
          })
          .catch(() => reject());
      });
    },
    fn_a_user__handle_refresh_token({ commit, state }) {
      return new Promise((resolve, reject) => {
        fn_api__handle__auth_oauth_refresh_token(state.refreshToken)
          .then(res => {
            fn_token__set(res.access_token);
            fn_refreshToken__set(res.refresh_token);
            commit(MUTATIONS_USER__SET_TOKEN, res.access_token, res.expires_in);
            commit(
              MUTATIONS_USER__SET_REFRESHTOKEN,
              res.refresh_token,
              res.expires_in
            );
            resolve();
          })
          .catch(error => reject(error));
      });
    },
    fn_a_user__handle_logout({ commit }) {
      return new Promise(resolve => {
        fn_api__handle__logout()
          .then(async () => {
            fn_token__remove();
            fn_refreshToken__remove();
            fn_storage__clear();
            commit(MUTATIONS_USER__CLEAR);
            resolve();
          })
          .catch(() => {
            fn_token__remove();
            fn_refreshToken__remove();
            fn_storage__clear();
            commit(MUTATIONS_USER__CLEAR);
            resolve();
          });
      });
    },
    fn_a_user__get_info({ commit }) {
      return new Promise((resolve, reject) => {
        fn_api__get__info()
          .then(res => {
            const { permissions, roles, user: userInfo } = res;
            fn_storage__set([
              { name: 'permissions', content: permissions },
              { name: 'roles', content: roles },
              { name: 'userInfo', content: userInfo }
            ]);
            commit(MUTATIONS_USER__SET_USERINFO, userInfo);
            commit(MUTATIONS_USER__SET_PERMISSION, permissions);
            commit(MUTATIONS_USER__SET_ROLES, roles);
            resolve();
          })
          .catch(() => reject());
      });
    },
    fn_a_user__get_routers({ commit }) {
      return new Promise((resolve, reject) => {
        fn_api__get__routers()
          .then(res => {
            let { menu, router } = fn_store__format_routers(res.data);
            fn_storage__set({ name: 'routes', content: router });
            fn_storage__set({ name: 'menu', content: menu });
            commit(MUTATIONS_USER__SET_ROUTER, router);
            commit(MUTATIONS_USER__SET_MENU, menu);
            resolve(router);
          })
          .catch(() => reject());
      });
    }
  }
};
export default user;
