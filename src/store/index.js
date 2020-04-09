import Vue from "vue";
import Vuex from "vuex";

import tasklistModule from "./tasklistModule";
import timeModule from "./timeModule";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    tasklistModule,
    timeModule,
  },
});

export default store;
