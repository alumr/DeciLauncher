// Vue Router 配置 — 使用 Hash 历史模式适配桌面 WebView 环境

// 导入路由创建函数和 Hash 历史模式
import { createRouter, createWebHashHistory } from 'vue-router'
// 导入首页视图组件
import HomeView from '../views/HomeView.vue'
import GamesView from "../views/GamesView.vue";
import DownloadsView from "../views/DownloadsView.vue";
import AccountsView from "../views/AccountsView.vue";
import SettingsView from "../views/Settings/SettingsView.vue";
import GameSettingsView from '../views/Settings/GameSettingsView.vue';
import LauncherSetingsView from '../views/Settings/LauncherSettingsView.vue';
import AboutView from '../views/Settings/AboutView.vue';

// 创建路由实例
const router = createRouter({
  // 使用 Hash 模式（URL 以 # 号分隔，刷新不产生 404）
  history: createWebHashHistory(),
  // 路由表定义
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/games',
      name: 'games',
      component: GamesView
    },
    {
      path: '/downloads',
      name: 'downloads',
      component: DownloadsView
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AccountsView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      redirect: '/settings/gameSettings',
      children: [
        {
          path: '/settings/gameSettings',
          name: 'gameSettings',
          component: GameSettingsView
        },
        {
          path: '/settings/LauncherSettings',
          name: 'launcherSettings',
          component: LauncherSetingsView
        },
        {
          path: '/settings/about',
          name: 'about',
          component: AboutView
        }
      ]
    }
  ]
})

// 导出路由实例供 main.ts 使用
export default router
