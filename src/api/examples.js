// import request from './index';
/*
 * 增 fn_api__examples_save + ''，method: post
 * 删 fn_api__examples_del + ''，method: post
 * 改 fn_api__examples_update + ''，method: post
 * 查 fn_api__examples_list + ''，method: get
 * 多操作 fn_api__examples_handle + ''
 * */

export const fn_api__examples_list = () => {
  return new Promise(resolve => {
    resolve({
      code: '0',
      list: [],
      message: ''
    });
  });
};

export const fn_api__examples_del = () => {
  return new Promise(resolve => {
    resolve({
      code: '0',
      data: null,
      message: ''
    });
  });
};

export function fn_api__examples_update() {
  return new Promise(resolve => {
    resolve({
      code: '0',
      data: null,
      message: ''
    });
  });
}

export function fn_api__examples_save() {
  return new Promise(resolve => {
    resolve({
      code: '0',
      data: null,
      message: ''
    });
  });
}
