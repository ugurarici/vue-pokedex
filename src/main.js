import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import App from "./App.vue";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.config.productionTip = false;

// router definition start
import HomePage from "./components/HomePage.vue";
import PokeDetail from "./components/PokeDetail.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/detail/:pokemon", component: PokeDetail },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});
// router definition end

// vuex start
const store = new Vuex.Store({
  state: {
    count: 0,
    list: [],
    detail: { id: 0 },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setList(state, payload) {
      state.list = payload;
    },
    setDetail(state, payload) {
      state.detail = payload;
    },
  },
  getters: {
    listResultsWithImage(state) {
      return state.list.results.map((item) => {
        var id = item.url.split("/")[6];
        item.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        return item;
      });
    },
  },
  actions: {
    fetchList(context, url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => context.commit("setList", data));
    },
    fetchPokemonDetail(context, pokemonName) {
      context.commit("setDetail", null);
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
          context.commit("setDetail", data);
          context.commit("increment");
        });
    },
  },
});
// vuex end

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
