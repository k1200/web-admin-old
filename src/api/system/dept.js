import request from '../index';

/**
 * @desc 新增
 * @param {Object} data
 */
export const fn_api__system_dept_save = data => {
  return request({
    url: '/system/dept',
    method: 'post',
    data
  });
};
/**
 * @desc 删除
 * @param {String|Number} deptId
 */
export const fn_api__system_dept_del = deptId => {
  return request({
    url: `/system/dept/${deptId}`,
    method: 'delete'
  });
};
/**
 * @desc 修改
 * @param {Object} data
 */
export const fn_api__system_dept_update = data => {
  return request({
    url: '/system/dept',
    method: 'put',
    data
  });
};
/**
 * @desc 获取数据
 * @param {Object} params
 */
export const fn_api__system_dept_list = params => {
  return request({
    url: '/system/dept/list',
    method: 'get',
    params
  });
};

/**
 * @desc 查询部门列表（排除节点）
 * @param {String|Nubmer} deptId
 */
export const fn_api__system_dept_list_exclude = deptId => {
  return request({
    url: `/system/dept/list/exclude/${deptId}`,
    method: 'get'
  });
};
/**
 * @desc 查询部门详细
 * @param {String|Nubmer} deptId
 */
export const fn_api__system_dept_desc = deptId => {
  return request({
    url: `/system/dept/${deptId}`,
    method: 'get'
  });
};
/**
 * @desc 查询部门下拉树结构
 */
export const fn_api__system_dept_treeselect = () => {
  return request({
    url: '/system/dept/treeselect',
    method: 'get'
  });
};
/**
 * @desc 根据角色ID查询部门树结构
 * @param {String|Number} roleId
 */
export const fn_api__system_dept_roleDeptTreeselect = roleId => {
  return request({
    url: `/system/dept/roleDeptTreeselect/${roleId}`,
    method: 'get'
  });
};
