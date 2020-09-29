export default {
  title: 'WEB SASS 管理系统', // 默认网页标题
  sidebarBgcolor: '#545c64', // 菜单栏背景色
  sidebarTitleBgcolor: '#2b3138', // 菜单栏背景色
  sidebarColor: '#fff', // 菜单栏字体颜色
  sidebarActiveColor: '#ffd04b', // 活动菜单字体颜色
  storageKey: 'web', // storage key
  fixed_width: false, // 是否固定页面宽度
  header_message: false, // 是否显示顶部消息
  header_nav: false, // 是否显示顶部导航

  // 固定tags(不可关闭)
  fixed_tags: [
    {
      path: '/',
      name: 'Home',
      meta: {
        icon: '',
        title: '首页',
        fixed: true
      }
    }
  ],
  tokenKey: 'Admin-Token', // 与服务端约定的 token 前缀
  refreshTokenKey: 'Admin-Refresh-Token', // 与服务端约定的 refreshToken 前缀
  client_id: 'web', // 与服务端约定的授权参数
  client_secret: '123456', // 与服务端约定的授权参数
  scope: 'server' // 与服务端约定的授权参数
};
