/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { Base64 } from 'js-base64';
import website from '@/conf/website';
import { baseUrl } from '@/conf/env';
import {
  fn_token__get,
  fn_refreshToken__get,
  fn_token__remove
} from '@/util/token';
import { fn_api__handle__auth_oauth_refresh_token } from '@/api/login';

axios.defaults.timeout = 600000;
//返回其他状态吗
axios.defaults.validateStatus = function(status) {
  return +status >= 200 && +status <= 500; // 默认的
};
//跨域请求，允许保存cookie
// axios.defaults.withCredentials = true;
// NProgress Configuration
NProgress.configure({
  showSpinner: false
});
//HTTPrequest拦截
axios.interceptors.request.use(
  config => {
    const token = fn_token__get();
    NProgress.start(); // start progress bar
    let url = config.url;
    // eslint-disable-next-line no-useless-escape
    if (url.indexOf(`http:\/\/`) === -1 && url.indexOf(`https:\/\/`) === -1) {
      config.url = baseUrl + config.url;
    }
    token && (config.headers['Authorization'] = 'Bearer ' + token); // 让每个请求携带自定义token
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//HTTPresponse拦截
axios.interceptors.response.use(
  res => {
    NProgress.done();
    let status = +res.data.code || 200;
    let message = res.data.msg || '未知错误';

    //如果是401则跳转到登录页面
    if (status === 401 || res.status === 401) {
      fn_token__remove();
      NProgress.done();
      if (res.status === 401) {
        fn_api__handle__auth_oauth_refresh_token(fn_refreshToken__get());
        Message({
          message: '未授权',
          type: 'error'
        });
      }
      return Promise.reject(new Error(res.error.error_description));
    } else if (status === 500 || res.status === 500) {
      if (res.status === 500) {
        message = '系统错误，联系管理员';
      }
      Message({
        message: message,
        type: 'error'
      });
      return Promise.reject(new Error(message));
    } else if (status !== 200 || res.status !== 200) {
      return Promise.reject('error');
    }

    return res.data;
  },
  error => {
    NProgress.done();
    return Promise.reject(new Error(error));
  }
);

export default axios;
