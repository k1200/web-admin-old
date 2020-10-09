import { fn_storage__set, fn_storage__get } from '@/util/storage';
import {
  MUTATIONS_TAG__ACTIVE,
  MUTATIONS_TAG__ADD,
  MUTATIONS_TAG__CLOSE,
  MUTATIONS_TAG__CLOSE_OTHER,
  MUTATIONS_TAG__CLEAR,
  MUTATIONS_TAG__CLEARALL
} from '@/store/mutations_type';
import website from '@/conf/website';
import router from '@/router';
const tags = {
  state: () => {
    return {
      active_router: fn_storage__get('active_router') || website.fixed_tags[0],
      tags: fn_storage__get('tags') || [],
      fixed_tags: website.fixed_tags
    };
  },
  mutations: {
    [MUTATIONS_TAG__ACTIVE](state, val) {
      state.active_router = val || state.fixed_tags[0];
    },
    [MUTATIONS_TAG__ADD](state, val) {
      state.tags.push(val);
    },

    [MUTATIONS_TAG__CLOSE](state, index) {
      state.tags.splice(index, 1);
    },
    [MUTATIONS_TAG__CLOSE_OTHER](state, val) {
      state.tags = [val];
    },
    [MUTATIONS_TAG__CLEAR](state) {
      state.tags = [];
    },
    [MUTATIONS_TAG__CLEARALL](state) {
      state.active_router = state.fixed_tags[0];
      state.tags = [];
    }
  },
  actions: {
    fn_a_tag__active({ commit, state }, val) {
      return new Promise(resolve => {
        commit(MUTATIONS_TAG__ACTIVE, val);
        fn_storage__set({
          name: 'active_router',
          content: state.active_router
        });
        resolve();
      });
    },
    fn_a_tag__add({ commit, state, dispatch }, val) {
      // 判断路由是否添加到 tags 中
      if (
        (typeof val.meta.tags === 'boolean' && !val.meta.tags) ||
        !val.meta.title
      ) {
        return false;
      }

      return new Promise(resolve => {
        if (val.path === state.active_router.path) {
          return resolve();
        }
        dispatch('fn_a_tag__active', val);
        if (
          state.tags.findIndex(item => item.path === val.path) === -1 &&
          state.fixed_tags.findIndex(item => item.path === val.path) === -1
        ) {
          commit(MUTATIONS_TAG__ADD, val);
          fn_storage__set({ name: 'tags', content: state.tags });
        }
        resolve();
      });
    },
    fn_a_tag__close({ commit, state, dispatch }, val) {
      return new Promise(resolve => {
        const index = state.tags.findIndex(item => item.path === val.path);
        commit(MUTATIONS_TAG__CLOSE, index);
        if (val.path === state.active_router.path) {
          let prev_tag = state.tags[index - 1] || null;
          dispatch('fn_a_tag__active', prev_tag); // 关闭的是活动tag, 活动tag向前移
          router.push(prev_tag ? prev_tag.path : '/').catch(error => error);
        }
        fn_storage__set({ name: 'tags', content: state.tags });
        resolve();
      });
    },
    fn_a_tag__close_others({ commit, state, dispatch }, val) {
      return new Promise(resolve => {
        dispatch('fn_a_tag__active', val || state.active_router);
        commit(MUTATIONS_TAG__CLOSE_OTHER, val);
        fn_storage__set({ name: 'tags', content: state.tags });
        router.push((val && val.path) || '/').catch(error => error);
        resolve();
      });
    },
    fn_a_tag__clear({ commit, state, dispatch }) {
      return new Promise(resolve => {
        dispatch('fn_a_tag__active', null);
        commit(MUTATIONS_TAG__CLEAR);
        fn_storage__set({ name: 'tags', content: state.tags });
        router.push('/').catch(error => error);
        resolve();
      });
    }
  }
};
export default tags;
