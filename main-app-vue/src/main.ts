import Vue from "vue";
import Antd from "ant-design-vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./routes";
import "./assets/styles/locale.antd.css";
// 一个进度条插件
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { message } from "ant-design-vue";
import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  start,
} from "qiankun";
import config from "@/config";

const {
  REACT_MICRO_APP,
  VUE_MICRO_APP,
  ANGULAR_MICRO_APP,
} = config;

const apps = [
  /**
   * name: 微应用名称 - 具有唯一性
   * entry: 微应用入口 - 通过该地址加载微应用，这里我们使用 config 配置
   * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
   * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
   */
  {
    name: "ReactMicroApp",
    entry: REACT_MICRO_APP,
    container: "#frame",
    activeRule: "/react",
  },
  {
    name: "VueMicroApp",
    entry: VUE_MICRO_APP,
    container: "#frame",
    activeRule: "/vue",
  },
  {
    name: "AngularMicroApp",
    entry: ANGULAR_MICRO_APP,
    container: "#frame",
    activeRule: "/angular",
  },
];




Vue.use(VueRouter);
Vue.use(Antd);
Vue.config.productionTip = false;

// 为 Angular 微应用所做的 zone 包注入
// 如果没有 Angular 微应用，请删除这行代码
import "zone.js/dist/zone";

registerMicroApps(apps, {
  // qiankun 生命周期钩子 - 加载前
  beforeLoad: (app: any) => {
    // 加载子应用前，加载进度条
    NProgress.start();
    console.log("before load", app.name);
    return Promise.resolve();
  },
  // qiankun 生命周期钩子 - 挂载后
  afterMount: (app: any) => {
    // 加载子应用前，进度条加载完成
    NProgress.done();
    console.log("after mount", app.name);
    return Promise.resolve();
  },
});

/**
 * 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler((event: Event | string) => {
  console.error(event);
  const { message: msg } = event as any;
  // 加载失败时提示
  if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {
    message.error("子应用加载失败，请检查应用是否可运行");
  }
});

start();

/**
 * 注册路由实例
 * 即将开始监听 location 变化，触发路由规则
 */
const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#main-app");
