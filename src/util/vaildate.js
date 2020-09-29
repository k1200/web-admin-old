// 判断是否为空
export const fn_validate__null = val => {
  if (typeof val === 'boolean' || typeof val === 'number') {
    return false;
  }
  if (Object.prototype.toString.call(val) === '[object Array]') {
    return !val.length;
  } else if (Object.prototype.toString.call(val) === '[object Object]') {
    return JSON.stringify(val) === '{}';
  } else if (
    val === 'null' ||
    val === null ||
    val === 'undefined' ||
    val === undefined ||
    val === ''
  ) {
    return true;
  }
  return false;
};
// 判断每一个参数是否为空
export const fn_validate__every_null = (...params) =>
  params.every(val => fn_validate__null(val));
// 判断是否某一个参数为空
export const fn_validate__some_null = (...params) =>
  params.some(val => fn_validate__null(val));
