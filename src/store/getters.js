const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  permission: state => state.user.permission,
  menu: state => state.user.menu,
  routes: state => state.user.routes,
  tags: state => state.tags.tags,
  active_router: state => state.tags.active_router,
  fixed_tags: state => state.tags.fixed_tags
};
export default getters;
