import request from '../index';
/**
 * @desc 查询登录日志列表
 * @param {Object} params
 */
export const fn_api__system_logininfor_list = params => {
  return request({
    url: '/system/logininfor/list',
    method: 'get',
    params
  });
};
/**
 * @desc 删除登录日志
 * @param {String} infoId
 */
export const fn_api__system_logininfor_del = infoId => {
  return request({
    url: `/system/logininfor/${infoId}`,
    method: 'delete'
  });
};
/**
 * @desc 清空登录日志
 */
export const fn_api__system_logininfor_clean = () => {
  return request({
    url: '/system/logininfor/clean',
    method: 'delete'
  });
};
