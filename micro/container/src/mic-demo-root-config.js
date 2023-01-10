import { registerApplication, start } from "single-spa";
import { constructApplications, constructRoutes } from "single-spa-layout"

// 获取路由配置对象
const routes = constructRoutes(document.querySelector("#single-spa-layout"))
// 获取路由信息数组
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name)
  }
})
// 遍历路由信息注册应用
applications.forEach(registerApplication)

/* registerApplication(
  "@single-spa/welcome",
  () =>
    System.import(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  location => (location.pathname === '/')
);

registerApplication({
  name: "@mic-demo/noframe",
  app: () => System.import("@mic-demo/noframe"),
  activeWhen: ["/noframe"]
});

registerApplication({
  name: "@mic-demo/reactframe",
  app: () => System.import("@mic-demo/reactframe"),
  activeWhen: ["/reactframe"]
});

registerApplication({
  name: "@mic-demo/vueframe",
  app: () => System.import("@mic-demo/vueframe"),
  activeWhen: ["/vueframe"]
}); */

start({
  urlRerouteOnly: true,
});
