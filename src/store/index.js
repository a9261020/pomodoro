import Vue from "vue";
import Vuex from "vuex";

import tasklistModule from "./tasklistModule";
import timeModule from "./timeModule";
import alertModule from "./alertModule";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    tasklistModule,
    timeModule,
    alertModule,
  },
});

export default store;
