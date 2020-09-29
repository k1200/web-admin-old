/**
 * @desc 获取数据类型
 * @param {Any} val
 * @returns {String} [array|string|number|null|undefind|function|object|boolean]
 */
export const fn_util__data_type = val => {
  let type = Object.prototype.toString.call(val);
  type = /^\[object\s(.*)\]$/.exec(type)[1];
  return type.toLocaleLowerCase();
};
/**
 * @desc 过滤对象中的空数据
 * @param {Object} obj
 * @returns {Object}
 */
export const fn_util__filter_null = obj => {
  const res = {};
  for (let key in obj) {
    const value = obj[key];
    const emptyVal = ['null', null, undefined, 'undefined', ''];
    !emptyVal.includes(value) && (res[key] = value);
  }
  return res;
};
/**
 * @desc 对象深克隆(真 -> 包括函数)
 * @param {Any} value
 * @returns {Any}
 */
export const fn_util__deep_clone = value => {
  const type = fn_util__data_type(value);
  if (type === 'array') {
    return value.map(item => fn_util__deep_clone(item));
  } else if (type === 'object') {
    let res = {};
    for (let key in value) {
      res[key] = fn_util__deep_clone(value[key]);
    }
    return res;
  }
  return value;
};
/**
 * @desc 函数防抖（debounce）：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时
 * @param {Function} handle 事件
 * @param {Object} context 事件执行环境
 * @param {Number} [time=300] 触发时间间隔
 * @returns {Function}
 */
export const fn_util_debounce = (handle, context, time = 300) => {
  let debounce;
  let handleThings = function() {
    handle.apply(context, arguments);
    debounce = undefined;
  };
  return function() {
    debounce && clearTimeout(debounce);
    debounce = setTimeout(handleThings, time);
  };
};
/**
 * @desc 函数节流（throttle）：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
 * @param {Function} handle 事件
 * @param {Object} context 事件执行环境
 * @param {Number} [time=300] 触发时间间隔
 * @returns {Function}
 */
export const fn_util_throttle = (handle, context, time = 300) => {
  let throttle;
  let handleThings = function() {
    handle.apply(context, arguments);
    throttle = undefined;
  };
  return function() {
    if (throttle) {
      throttle = setTimeout(handleThings, time);
    }
  };
};
/**
 * @desc 获取 DOM 距离视窗边界的距离
 * @param {String} select css选择器
 * @returns {Object} obj
 * @returns {Number} obj.top
 * @returns {Number} obj.right
 * @returns {Number} obj.bottom
 * @returns {Number} obj.left
 */
export const fn_util_get_clientRect = select => {
  let clientRect = document.querySelector(select).getBoundingClientRect();
  let [clientWidth, clientHeight] = [
    document.body.clientHeight,
    document.body.clientWidth
  ];
  return {
    top: clientRect.top,
    right: clientWidth - clientRect.right,
    bottom: clientHeight - clientRect.bottom,
    left: clientRect.left
  };
};
/**
 * @desc 通过属性值在多维对象数组中筛选目标对象(目标对象的祖先链未知)
 * @param {Object|Array} data 数据源
 * @param {String|Number} value 属性值
 * @param {String} prop 属性
 * @param {String} children 下级数据源标识
 * @param {Array} [ancestors] 目标对象的祖先链
 * @returns {Array|null} ancestors
 */
export const fn_util__find_deep = function f(
  data,
  value,
  prop,
  children,
  ancestors = []
) {
  if (!value) {
    return false;
  }
  if (Object.prototype.toString.call(data) === '[object Array]') {
    let res = data.find(child => f(child, value, prop, children, ancestors));
    if (res) {
      ancestors.unshift(res);
      return ancestors;
    } else {
      return null;
    }
  } else if (value === data[prop]) {
    return true;
  } else if (data[children] && data[children].length) {
    return f(data[children], value, prop, children, ancestors);
  }
  return false;
};

/**
 * @desc 通过祖先链在多维对象数组中筛选目标对象(目标对象的祖先链已知)
 * @param {Object|Array} data 数据源
 * @param {Array|String} ancestors 目标对象的祖先链
 * @param {String} prop 属性
 * @param {String} children 下级数据源标识
 * @returns {Array|null} ancestors
 */
export const fn_util__find_to_deep = function f(
  data,
  ancestors,
  prop,
  children
) {
  if (!ancestors || ancestors.length === 0) {
    return null;
  }
  if (typeof ancestors === 'string') {
    ancestors = ancestors.split();
  }
  let res = data;
  let temp_ancestors = [];
  if (Object.prototype.toString.call(res) === '[object Object]') {
    res = [res];
  }
  for (let value of ancestors) {
    let temp_res = res.find(item => item[prop] === value);
    if (!temp_res) {
      return false;
    }
    temp_ancestors.push(temp_res);
    res = temp_res[children];
  }
  return temp_ancestors;
};

/**
 * 构造树型结构数据（ruoyi）
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
  id = id || 'id';
  parentId = parentId || 'parentId';
  children = children || 'children';
  rootId = rootId || 0;
  //对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data));
  //循环所有项
  const treeData = cloneData.filter(father => {
    let branchArr = cloneData.filter(child => {
      //返回每一项的子级数组
      return father[id] === child[parentId];
    });
    branchArr.length > 0 ? (father.children = branchArr) : '';
    //返回第一层
    return father[parentId] === rootId;
  });
  return treeData != '' ? treeData : data;
}

// /**
//  * @desc element-ui 表格数数据构建
//  */
// export const fn_util_create_element_table_tree = (data, key, parentKey) => {
//   let [parent, children] = [[], []];
//   for (let i = data.length - 1; i > 0; i--) {
//     let node = data[i];
//     let prev_node = data[i - 1];
//     if (node[parentKey] === prev_node[key]) {
//       // 上一个节点是当前节点的父节点
//       if (
//         Object.prototype.toString.call(prev_node.children) !== '[object Array]'
//       ) {
//         prev_node.children = [];
//       }
//       prev_node.children.unshift(node);
//     } else if (node[key] === prev_node[parentKey]) {
//       // 上一个节点是当前节点的子节点
//       if (Object.prototype.toString.call(node.children) !== '[object Array]') {
//         node.children = [];
//       }
//       node.children.unshift(data[i - 1]);
//     } else {
//       // 上一个节点与当前节点不是父子关系
//       let next_data = data.slice(-2);
//       for (let n = next_data.length - 1; n >= 0; n--) {
//         let _node = next_data[n];
//         if (node[parentKey] === _node[key]) {
//           // 其他节点是当前节点的父节点
//           if (
//             Object.prototype.toString.call(prev_node.children) !==
//             '[object Array]'
//           ) {
//             _node.children = [];
//           }
//           _node.children.unshift(node);
//         } else if (node[key] === _node[parentKey]) {
//           // 其他节点是当前节点的子节点
//           if (
//             Object.prototype.toString.call(node.children) !== '[object Array]'
//           ) {
//             node.children = [];
//           }
//         }
//       }
//     }
//   }
//   for (let [node, index] of data) {
//     let parent = null,
//       children = [],
//       siblings = [];
//     node[parentKey]; // 父级key
//     data[index + 1][parentKey];

//     if (node[parentKey] === data[index + 1][key]) {
//       // 下一个节点是当前节点的父节点
//       parent = data[index + 1];
//       parent.children = children;
//     } else if (node[parentKey] === data[index + 1][parentKey]) {
//       // 下一个节点是当前节点的兄弟节点
//       siblings.push(data[index + 1]);
//     } else if (node[key] === data[index + 1][parentKey]) {
//       // 下一个节点是当前节点的子节点
//       children.push(data[index + 1]);
//     } else {
//       // 下一个节点与当前节点无直接关系
//     }
//   }
// };
