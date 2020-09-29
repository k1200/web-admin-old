/* eslint-disable no-undef */

// import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import simpleLayout from '@/packages/layouts/default';
import './packages';
import './vutil/directives';
import './vutil/filters';
import './router/permission'; // 权限
import util from '@/util/global';
import Vue from 'vue';

Vue.config.productionTip = false;
Vue.config.performance = process.env.NODE_ENV === 'development';
Vue.component('simple-layout', simpleLayout);
Vue.prototype.util = util;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
