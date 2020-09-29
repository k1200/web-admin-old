import request from './index';
import website from '@/conf/website';
let { client_id, client_secret, scope } = website;
/*
 * 增 apiSave+ ''，method: post
 * 删 apiRemove + ''，method: post
 * 改 apiUpdate + ''，method: post
 * 查 apiGet + ''，method: get
 * 多操作 apiHandle + ''
 * */
/**
 * @desc 登录方法
 * @param {Object} data
 * @param {String} data.username
 * @param {String} data.password
 * @param {String} data.code
 * @param {String} data.uuid
 */
export const fn_api__handle__auth_oauth_token = params => {
  let url = process.env.VUE_APP_PROXY_TARGET_IS_RUOYI
    ? '/login'
    : '/auth/oauth/token';
  console.log(process.env.VUE_APP_PROXY_TARGET);
  return request({
    url,
    method: process.env.VUE_APP_PROXY_TARGET_IS_RUOYI ? 'post' : 'get',
    params: {
      client_id,
      client_secret,
      scope,
      grant_type: 'password',
      ...params
    },
    data: {
      client_id,
      client_secret,
      scope,
      grant_type: 'password',
      ...params
    }
  });
};
// 刷新方法
export const fn_api__handle__auth_oauth_refresh_token = refresh_token => {
  const grant_type = 'refresh_token';
  return request({
    url: '/auth/oauth/token',
    method: 'post',
    params: { client_id, client_secret, grant_type, scope, refresh_token }
  });
};
// export const fn_api__handle__login = data => {
//   return request({
//     url: '/login',
//     method: 'post',
//     data: data
//   });
// };
// 获取用户详细信息
export function fn_api__get__info() {
  let url = process.env.VUE_APP_PROXY_TARGET_IS_RUOYI
    ? '/getInfo'
    : '/system/user/getInfo';
  return request({
    url,
    method: 'get'
  });
}

// 退出方法
export function fn_api__handle__logout() {
  return request({
    url: '/logout',
    method: 'post'
  });
}
// 获取验证码
export const fn_api__get__code = () => {
  console.log(process.env.VUE_APP_PROXY_TARGET_IS_RUOYI);
  let url = process.env.VUE_APP_PROXY_TARGET_IS_RUOYI
    ? '/captchaImage'
    : '/code';
  return request({
    url,
    method: 'get'
  });
};
// export const fn_api__get__captcha_image = () => {
//   return request({
//     url: '/captchaImage',
//     method: 'get'
//   });
// };
// 获取路由
export const fn_api__get__routers = () => {
  let url = process.env.VUE_APP_PROXY_TARGET_IS_RUOYI
    ? '/getRouters'
    : '/system/menu/getRouters';
  return request({
    url,
    method: 'get'
  });
};
// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn
// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn
// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn// /auth/bank/signIn
// 获取路由
export const fn_api__test1 = () => {
  return request({
    url: '/bank/signIn',
    method: 'post'
  });
};
export const fn_api__test2 = () => {
  return request({
    url: '/bank/queryCheckPendingCashOutFlows',
    method: 'post'
  });
};
