import request from './index';

/**
 * @desc 查询字典数据列表
 * @param {Object} params
 */
export const fn_api__system_dict_data_list = params => {
  return request({
    url: '/system/dict/data/list',
    method: 'get',
    params
  });
};

/**
 * @desc 查询字典数据详细
 * @param {String|Number} dictCode
 */
export const fn_api__system_dict_data_desc = dictCode => {
  return request({
    url: `/system/dict/data/${dictCode}`,
    method: 'get'
  });
};
/**
 * @desc 根据字典类型查询字典数据信息
 * @param {String} dictType
 */
export const fn_api__system_dict_data_type_desc = dictType => {
  return request({
    url: `/system/dict/data/type/${dictType}`,
    method: 'get'
  });
};
/**
 * @desc 新增字典数据
 * @param {object} data
 */
export const fn_api__system_dict_data_save = data => {
  return request({
    url: '/system/dict/data',
    method: 'post',
    data
  });
};
/**
 * @desc 修改字典数据
 * @param {Object} data
 */
export const fn_api__system_dict_data_update = data => {
  return request({
    url: '/system/dict/data',
    method: 'put',
    data
  });
};
/**
 * @desc 删除字典数据
 * @param {String|Number} dictCode
 */
export const fn_api__system_dict_data_del = dictCode => {
  return request({
    url: `/system/dict/data/${dictCode}`,
    method: 'delete'
  });
};
