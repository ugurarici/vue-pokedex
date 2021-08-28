import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";

Vue.use(VueRouter);
Vue.config.productionTip = false;

import HomePage from "./components/HomePage.vue";
import PokeDetail from "./components/PokeDetail.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/detail/:pokemon", component: PokeDetail },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
