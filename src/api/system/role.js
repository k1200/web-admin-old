import request from '../index';

/**
 * @desc 新增
 * @param {Object} data
 */
export const fn_api__system_role_save = data => {
  return request({
    url: '/system/role',
    method: 'post',
    data
  });
};
/**
 * @desc 删除
 * @param {String|Number} roleId
 */
export const fn_api__system_role_del = roleId => {
  return request({
    url: '/system/role/' + roleId,
    method: 'delete'
  });
};
/**
 * @desc 修改
 * @param {Object} data
 */
export const fn_api__system_role_update = data => {
  return request({
    url: '/system/role',
    method: 'put',
    data
  });
};
/**
 * @desc 修改角色状态
 * @param {Object} data
 * @param {String|Number} data.roleId
 * @param {String|Number} data.status
 */
export const fn_api__system_role_changeStatus = data => {
  return request({
    url: '/system/role/changeStatus',
    method: 'put',
    data
  });
};
/**
 * @desc 获取角色列表
 * @param {Object} params
 */
export const fn_api__system_role_list = params => {
  return request({
    url: '/system/role/list',
    method: 'get',
    params
  });
};
/**
 * @desc 查询角色详细
 * @param {String|Number} roleId
 */
export const fn_api__system_role_desc = roleId => {
  return request({
    url: `/system/role/${roleId}`,
    method: 'get'
  });
};
/**
 * @desc 设置角色数据权限
 * @param {Object} data
 */
export const fn_api__system_role_dataScope = data => {
  return request({
    url: '/system/role/dataScope',
    method: 'put',
    data
  });
};
