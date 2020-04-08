import Vue from "vue";
import Vuex from "vuex";

import tasklistModule from "./tasklistModule";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    t1: "hello from store",
  },
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    tasklistModule,
  },
});

export default store;
