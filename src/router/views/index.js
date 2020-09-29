import store from '@/store';
import Layout from '@/packages/layouts/container';
import { fn_token__get } from '@/util/token';
export default [
  {
    path: '',
    name: '首页',
    component: Layout,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "page" */ '@/views/Home'),
        meta: {
          icon: '',
          title: '首页'
        }
      },
      {
        path: 'table',
        name: 'Table',
        component: () =>
          import(/* webpackChunkName: "page" */ '@/examples/table/index'),
        meta: {
          icon: '',
          title: '例子-表格'
        }
      },
      {
        path: 'form',
        name: 'Form',
        component: () =>
          import(/* webpackChunkName: "page" */ '@/examples/form/index'),
        meta: {
          icon: '',
          title: '例子-表单'
        }
      }
    ],
    meta: {},
    beforeEnter: (to, from, next) => {
      if (!fn_token__get()) {
        store.dispatch('fn_a_user__handle_logout').then(() => {
          next('/login');
        });
      } else {
        next();
      }
    }
  }
];
