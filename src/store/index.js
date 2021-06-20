import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

import User from "./modules/user/index";

export default new Vuex.Store({
  strict: false,
  state: {},
  mutations: {},
  actions: {},
  plugins: [vuexLocal.plugin],
  modules: {
    User,
  },
});
