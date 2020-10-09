/** !
 * FileName      : util
 * Version       : v1.0.0
 * Description   : store 模块工具函数
 * Author        : 1200 1053182739@qq.com
 * Created       : 2020-08-31 18:42
 **/
import routerInstance from '@/router';
import Layout from '@/packages/layouts/container';
// import LoadingComponent from '@/packages/asyncloading';
import ErrorComponent from '@/pages/error-page/asyncerror';
import IframeComponent from '@/pages/webiframe';

/**
 * @desc 异步加载路由组件
 * @param {Strin} component 组件路径
 * @returns {Promise}
 */
const fn_load__component = path => {
  // 异步加载组件 出错时返回一个默认的错误组件
  return () => {
    const component = import(`@/views/${path}`);
    return new Promise(resolve => {
      component
        .then(() => resolve(component))
        .catch(e => {
          console.log(e);
          resolve(ErrorComponent);
        });
    });
    // 网上方法
    // const asyncComponent = () => ({
    //   // 需要加载的组件 (应该是一个 `Promise` 对象)
    //   component: import(`@/views/${path}`),
    //   // 异步组件加载时使用的组件
    //   loading: LoadingComponent,
    //   // 加载失败时使用的组件
    //   error: ErrorComponent,
    //   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    //   delay: 200,
    //   // 如果提供了超时时间且组件加载也超时了，
    //   // 则使用加载失败时使用的组件。默认值是：`Infinity`
    //   timeout: 3000
    // });
    // // // ？？？
    // return Promise.resolve({
    //   functional: true,
    //   render(h) {
    //     return h(asyncComponent);
    //   }
    // });
  };
};
/**
 * @desc 路由解析
 * @param {Array} router
 * @param {Array} [route]
 * @param {Array} [menu]
 * @returns {Object}
 */
const fn_format__router = (router, route = [], menu = []) => {
  let [temp_menu, temp_route] = [{}, {}];
  if (Object.prototype.toString.call(router) === '[object Array]') {
    router.forEach(item => {
      fn_format__router(item, route, menu);
    });
  } else {
    // 判断是否为外链
    // 是外链加载 webiframe 组件
    let is_link = /^https?:\/\/.+/.test(router.path);
    if (is_link) {
      temp_menu.meta = router.meta;
      temp_menu.path = '/webiframe?to=' + router.path;
      temp_menu.name = router.meta.title;
      temp_route = {
        ...temp_menu,
        path: '/webiframe',
        component: IframeComponent
      };
      route.push(temp_route);
    } else {
      ({ meta: temp_menu.meta, path: temp_menu.path } = router);
      temp_menu.name = router.path.replace('/', '_').slice(1);
      temp_route = { ...temp_menu };
      // 如果存在 children， 优先处理 children
      if (router.children && router.children.length) {
        let children = fn_format__router(router.children, route, []);
        temp_menu.children = children.menu;
      }
      // 如果当前 router 存在组件，异步加载相应组件
      if (router.component) {
        // 公司项目 服务端默认的组件，可根据实际情况修改
        if (router.component !== 'Layout') {
          // route.component 函数 应该返回一个 Promise 对象
          temp_route.component = fn_load__component(router.component); // 异步加载组件
          route.push(temp_route);
        } else if (!router.children || !router.children.length) {
          // 如果 children 不存在 并且 component = Layout，可选择是否在左侧菜单中显示（这里选择显示）
          // temp_menu = null // 左侧菜单中不显示
          temp_route.component = ErrorComponent;
          route.push(temp_route);
        }
      } else if (!router.children || !router.children.length) {
        // 如果当前 router 不存在组件并且 不存在 children，可选择是否在左侧菜单中显示（这里选择显示）
        // temp_menu = null // 左侧菜单中不显示
        temp_route.component = ErrorComponent;
        route.push(temp_route);
      }
    }
    if (temp_menu && !router.hidden) {
      menu.push(temp_menu);
    }
  }
  return { route, menu };
};

export const fn_store__format_routers = routers => {
  let routerWarp = [];
  let { route: router, menu } = fn_format__router(routers);
  menu.unshift({
    path: '/',
    name: 'Home',
    meta: { icon: '', title: '首页' }
  });
  routerWarp = [
    {
      path: '',
      name: '首页',
      component: Layout,
      redirect: '/',
      children: router
    }
  ];

  routerInstance.addRoutes(routerWarp);
  return {
    menu,
    router: routerWarp
  };
};
