/* eslint-disable no-undef */
// import Vue from 'vue';
// import VueRouter from 'vue-router';
import DefaultPage from './pages/index';
import DefaultView from './views/index';
// 解决 vue-router 3.0+ 跳转相同地址会报错误的问题
const ROUTER_PUSH = VueRouter.prototype.push;
VueRouter.prototype.push = function(location, onComplete, onAbort) {
  console.log(location);
  let temp = ROUTER_PUSH.call(this, location, onComplete, onAbort);
  if (temp) {
    return temp.catch(error => error);
  }
};
Vue.use(VueRouter);
export const routesAll = [...DefaultPage, ...DefaultView];
const router = new VueRouter({
  mode: 'history',
  routes: routesAll
});
export default router;
