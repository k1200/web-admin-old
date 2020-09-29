/** !
 * FileName      : index
 * Version       : v1.0.0
 * Description   : 静态路由
 * Author        : 1200 1053182739@qq.com
 * Created       : 2020-08-31 14:27
 **/

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb|tags: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
    noAuth: true,                // 如果设置为true，则不会鉴权
    keepAlive: true              // 如果设置为true，则会缓存页面
  }
 */

/**
 * meta.noAuth 不需要认证
 */

export default [
  {
    path: '/login',
    name: '登陆系统',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/pages/login/index'),
    meta: {
      tags: false
    }
  },
  {
    path: '/register',
    name: '注册账号',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/pages/register/index')
  },
  {
    path: '/forgetPass',
    name: '找回密码',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/pages/forgetPass/index')
  },
  {
    path: '/iframe',
    name: 'Iframe',
    component: () => import(/* webpackChunkName: "page" */ '@/pages/webiframe'),
    meta: {
      title: '',
      icon: ''
    }
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/pages/error-page/404'),
    name: '404'
  },
  {
    path: '/403',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/pages/error-page/403'),
    name: '403'
  },
  {
    path: '/500',
    component: () =>
      import(/* webpackChunkName: "page" */ '@/pages/error-page/500'),
    name: '500'
  }
];
