/** !
 * FileName      : toFixed
 * Version       : v1.0.0
 * Description   : 格式化数字显示指令
 * Author        : 1200 1053182739@qq.com
 * Created       : 2020-09-07 10:14
 **/
/**
 * @desc 格式化数字显示
 * @param {String|Number} val 表达式的值
 * @param {Number} [num] 保留 num 位小数
 * @returns {Number}
 */
export default (val, num = 2) => {
  if (typeof +val === 'number') {
    return +val.toFixed(num);
  } else {
    return val;
  }
};
