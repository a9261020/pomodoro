import Vue from "vue";
import Vuex from "vuex";

import tasklistModule from "./tasklistModule";
import timeModule from "./timeModule";
import alertModule from "./alertModule";
import ringModule from "./ringModule";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    tasklistModule,
    timeModule,
    alertModule,
    ringModule,
  },
});

export default store;
