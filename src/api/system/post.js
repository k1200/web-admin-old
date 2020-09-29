import request from '../index';

/**
 * @desc 新增
 * @param {Object} data
 */
export const fn_api__system_post_save = data => {
  return request({
    url: '/system/post',
    method: 'post',
    data
  });
};
/**
 * @desc 删除
 * @param {String|Number} postId
 */
export const fn_api__system_post_del = postId => {
  return request({
    url: `/system/post/${postId}`,
    method: 'delete'
  });
};
/**
 * @desc 修改
 * @param {Object} data
 */
export const fn_api__system_post_update = data => {
  return request({
    url: '/system/post',
    method: 'put',
    data
  });
};
/**
 * @desc 获取数据
 * @param {Object} params
 */
export const fn_api__system_post_list = params => {
  return request({
    url: '/system/post/list',
    method: 'get',
    params
  });
};

/**
 * @desc 查询岗位详细
 * @param {String|Nubmer} postId
 */
export const fn_api__system_post_desc = postId => {
  return request({
    url: `/system/post/${postId}`,
    method: 'get'
  });
};
