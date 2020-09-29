import website from '@/conf/website';
import { fn_validate__null } from '@/util/vaildate';
let keyName = website.storageKey + '-';
// 设置缓存
const storage__set = (params = {}) => {
  let { name, content, type = 'sessionStorage' } = params;
  name = keyName + name;
  let obj = {
    dataType: typeof content,
    content: content,
    datetime: new Date().getTime()
  };
  window[type].setItem(name, JSON.stringify(obj));
};
export const fn_storage__set = (params = {}) => {
  const type = Object.prototype.toString.call(params);
  if (type === '[object Object]') {
    storage__set(params);
  } else if (type === '[object Array]') {
    params.forEach(ele => {
      storage__set(ele);
    });
  }
};
// 获取缓存
export const fn_storage__get = name => {
  name = keyName + name;
  let obj = {},
    content;
  obj = window.sessionStorage.getItem(name);
  if (fn_validate__null(obj)) {
    obj = window.localStorage.getItem(name);
    if (fn_validate__null(obj)) {
      return;
    }
  }
  try {
    obj = JSON.parse(obj);
  } catch {
    return obj;
  }
  if (obj.dataType === 'string') {
    content = obj.content;
  } else if (obj.dataType === 'number') {
    content = Number(obj.content);
  } else if (obj.dataType === 'boolean') {
    content = eval(obj.content);
  } else if (obj.dataType === 'object') {
    content = obj.content;
  }
  return content;
};
// 删除某个缓存
export const fn_storage__remove = name => {
  name = keyName + name;
  window.sessionStorage.removeItem(name);
  window.localStorage.removeItem(name);
};
// 清空缓存
export const fn_storage__clear = () => {
  window.sessionStorage.clear();
  window.localStorage.clear();
};
