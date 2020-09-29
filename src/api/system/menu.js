import request from '../index';
/**
 * @desc 新增
 * @param {Object} data
 */
export const fn_api__system_menu_save = data => {
  return request({
    url: '/system/menu',
    method: 'post',
    data
  });
};
/**
 * @desc 删除
 * @param {String} params
 */
export const fn_api__system_menu_del = menuId => {
  return request({
    url: '/system/menu/' + menuId,
    method: 'delete'
  });
};
/**
 * @desc 修改
 * @param {Object} data
 */
export const fn_api__system_menu_update = data => {
  return request({
    url: '/system/menu',
    method: 'put',
    data
  });
};

/**
 * @desc 菜单列表
 * @param {Object} params
 */
export const fn_api__system_menu_list = params => {
  return request({
    url: '/system/menu/list',
    method: 'get',
    params
  });
};
/**
 * @desc 查询菜单详细
 * @param {String|Number} menuId
 */
export const fn_api__system_menu_desc = menuId => {
  return request({
    url: '/system/menu/' + menuId,
    method: 'get'
  });
};
/**
 * @desc 查询菜单下拉树结构
 */
export const fn_api__system_menu_treeselect = () => {
  return request({
    url: '/system/menu/treeselect',
    method: 'get'
  });
};
/**
 * @desc 根据角色ID查询菜单下拉树结构
 * @param {String|Number} roleId
 */
export const fn_api__system_menu_roleMenuTreeselect = roleId => {
  return request({
    url: '/system/menu/roleMenuTreeselect/' + roleId,
    method: 'get'
  });
};
