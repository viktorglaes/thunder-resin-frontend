import Vue from "vue";
import Vuex from "vuex";
import Posts from "./modules/Posts";
import Auth from "./modules/Auth";
import Characters from "./modules/Characters";
import Weapons from "./modules/Weapons";
import Guides from "./modules/Guides";
import Comments from "./modules/Comments";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Posts,
    Auth,
    Characters,
    Weapons,
    Guides,
    Comments,
  },
  plugins: [createPersistedState()],
});
