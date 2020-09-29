/** !
 * FileName      : batch_require
 * Version       : v1.0.0
 * Description   : 批量引入文件并进行对应操作
 * Author        : 1200 1053182739@qq.com
 * Created       : 2020-09-07 09:22
 **/

// import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
export default reg => {
  const requireComponent = require.context(
    // 其组件目录的相对路径
    '.',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    reg
  );

  requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName);
    // 获取组件名，如果组件配置没有name,则文件名
    const name = (componentConfig.default || componentConfig).name || fileName;
    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
      camelCase(
        // 获取和目录深度无关的文件名
        name
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    );
    console.log(componentName);
    // // 全局注册组件
    // Vue.component(
    //   componentName,
    //   // 如果这个组件选项是通过 `export default` 导出的，
    //   // 那么就会优先使用 `.default`，
    //   // 否则回退到使用模块的根。
    //   componentConfig.default || componentConfig
    // );
  });
};