import request from './index';

/**
 * @desc 新增
 * @param {Object} data
 */
export const fn_api_save__dict = data => {
  return request({
    url: '/auth/oauth/token',
    method: 'post',
    data
  });
};
/**
 * @desc 删除
 * @param {String} params
 */
export const fn_api_del__dict = params => {
  return request({
    url: '/login',
    method: 'get',
    params
  });
};
/**
 * @desc 修改
 * @param {Object} data
 */
export const fn_api_update__dict = data => {
  return request({
    url: '/getInfo',
    method: 'post',
    data
  });
};
/**
 * @desc 获取数据
 * @param {Object} params
 */
export const fn_api_get__dict = params => {
  return request({
    url: '/getInfo',
    method: 'get',
    params
  });
};
