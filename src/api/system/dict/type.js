import request from './index';

/**
 * @desc 查询字典类型列表
 * @param {Object} params
 */
export const fn_api__system_dict_type_list = params => {
  return request({
    url: '/system/dict/type/list',
    method: 'get',
    params
  });
};

/**
 * @desc 查询字典类型详细
 * @param {String|Number} dictId
 */
export const fn_api__system_dict_type_desc = dictId => {
  return request({
    url: `/system/dict/type/${dictId}`,
    method: 'get'
  });
};

/**
 * @desc 新增字典类型
 * @param {Object} data
 */
export const fn_api__system_dict_type_save = data => {
  return request({
    url: '/system/dict/type',
    method: 'post',
    data
  });
};

/**
 * @desc 修改字典类型
 * @param {Object} data
 */
export const fn_api__system_dict_type_update = data => {
  return request({
    url: '/system/dict/type',
    method: 'put',
    data
  });
};

/**
 * @desc 删除字典类型
 * @param {String|Number} dictId
 */
export const fn_api__system_dict_type_del = dictId => {
  return request({
    url: `/system/dict/type/${dictId}`,
    method: 'delete'
  });
};

/**
 * @desc 清理参数缓存
 */
export const fn_api__system_dict_type_clearCache = () => {
  return request({
    url: '/system/dict/type/clearCache',
    method: 'delete'
  });
};

/**
 * @desc 获取字典选择框列表
 */
export const fn_api__system_dict_type_optionselect = () => {
  return request({
    url: '/system/dict/type/optionselect',
    method: 'get'
  });
};
