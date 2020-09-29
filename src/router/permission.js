import Router from './index';
import website from '@/conf/website';
import { fn_token__get } from '@/util/token';
import store from '@/store';
import { fn_validate__null } from '@/util/vaildate';
const fn_format__to = to => {
  let { path, name, meta } = to;
  return { path, name, meta };
};
Router.beforeEach((to, from, next) => {
  const userInfo = store.getters.userInfo;
  const hasToken = fn_token__get();
  // 临时打开新浏览器的标签
  if (/^\/?https?:.+/.test(to.path)) {
    console.log(to.path.slice(1));
    window.open(to.path.slice(1));
    return next(false);
  }
  if ((to.meta.noAuth && hasToken) || (!to.name && !hasToken)) {
    return next('/');
  }
  if (fn_validate__null(userInfo) && hasToken) {
    Promise.all([
      store.dispatch('fn_a_user__get_info'),
      store.dispatch('fn_a_user__get_routers')
    ])
      .then(() => {
        next({ ...to, replace: true });
      })
      .catch(() => {
        store.dispatch('fn_a_user__handle_logout').then(() => {
          next({ path: '/login' });
        });
      });
  } else {
    store.dispatch('fn_a_tag__add', fn_format__to(to));
    next();
  }
  // else if (!to.name && hasToken) {
  //   return next('/404');
  // }
});
Router.afterEach(to => {
  document.title = to.meta.title || website.title; // 动态设置浏览器标题
});
