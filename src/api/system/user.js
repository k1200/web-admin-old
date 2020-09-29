import request from '../index';

/**
 * @desc 新增
 * @param {Object} data
 */
export const fn_api__system_user_save = data => {
  return request({
    url: '/system/user',
    method: 'post',
    data
  });
};
/**
 * @desc 删除
 * @param {String|Number} userId
 */
export const fn_api__system_user_del = userId => {
  return request({
    url: `/system/user/${userId}`,
    method: 'delete'
  });
};
/**
 * @desc 修改
 * @param {Object} data
 */
export const fn_api__system_user_update = data => {
  return request({
    url: '/system/user',
    method: 'put',
    data
  });
};
/**
 * @desc 获取用户列表
 * @param {Object} params
 */
export const fn_api__system_user_list = params => {
  return request({
    url: '/system/user/list',
    method: 'get',
    params
  });
};
/**
 * @desc 查询用户详细(获取角色，岗位数据)
 * @param {String|Number} [userId]
 */
export const fn_api__system_user = userId => {
  return request({
    url: `/system/user/${userId || ''}`,
    method: 'get'
  });
};
/**
 * @desc 用户密码重置
 * @param {Object} data
 * @param {String|Number} data.userId
 * @param {String} data.password
 */
export const fn_api__system_user_resetPwd = data => {
  return request({
    url: '/system/user/resetPwd',
    method: 'put',
    data
  });
};
/**
 * @desc 修改用户状态
 * @param {Object} data
 * @param {String|Number} data.userId
 * @param {String} data.status
 */
export const fn_api__system_user_changeStatus = data => {
  return request({
    url: '/system/user/changeStatus',
    method: 'put',
    data
  });
};

// ////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////

/**
 * @desc 查询用户个人信息
 * @param {Object} data
 * @param {String|Number} data.userId
 * @param {String} data.status
 */
export const fn_api__system_user_profile = () => {
  return request({
    url: '/system/user/profile',
    method: 'get'
  });
};
/**
 * @desc 修改用户个人信息
 * @param {Object} data
 */
export const fn_api__system_user_profile_update = data => {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data
  });
};
/**
 * @desc 用户密码重置
 * @param {Object} params
 * @param {String} params.oldPassword
 * @param {String} params.newPassword
 */
export const fn_api__system_user_profile_updatePwd = params => {
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params
  });
};
/**
 * @desc 用户头像上传
 * @param {Object} data
 */
export const fn_api__system_user_profile_avatar = data => {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data
  });
};
