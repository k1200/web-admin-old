import request from '../index';
/**
 * @desc 查询操作日志列表
 * @param {Object} params
 */
export const fn_api__system_operlog_list = params => {
  return request({
    url: '/system/operlog/list',
    method: 'get',
    params
  });
};
/**
 * @desc 删除操作日志
 * @param {String} infoId
 */
export const fn_api__system_operlog_del = infoId => {
  return request({
    url: `/system/operlog/${infoId}`,
    method: 'delete'
  });
};
/**
 * @desc 清空操作日志
 */
export const fn_api__system_operlog_clean = () => {
  return request({
    url: '/system/operlog/clean',
    method: 'delete'
  });
};
