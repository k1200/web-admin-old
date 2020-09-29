/** !
 * FileName      : mixin
 * Version       : v1.0.0
 * Description   : 全局混入
 * Author        : 1200 1053182739@qq.com
 * Created       : 2020-09-03 15:09
 **/

const mixin = {
  created: function() {
    console.log('混入对象的钩子被调用');
  }
};
export default mixin;
