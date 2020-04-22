import Vue from "vue";
import Vuex from "vuex";

import tasklistModule from "./tasklistModule";
import timeModule from "./timeModule";
import alertModule from "./alertModule";
import ringModule from "./ringModule";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    date: {},
  },
  actions: {
    getDate(context) {
      const date = {
        year: "",
        month: "",
        day: "",
        week: "",
        dateCode: "",
        id: "",
      };
      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth() + 1;
      const todayDay = today.getDate();
      date.year = todayYear;
      date.month = todayMonth;
      date.day = todayDay;
      date.week = today.getDay();
      date.dateCode = `${todayYear}.${todayMonth}.${todayDay}`;
      date.id = today.getTime();
      context.commit("GET_DATE", date);
    },
  },
  mutations: {
    GET_DATE(state, date) {
      state.date = date;
    },
  },
  modules: {
    tasklistModule,
    timeModule,
    alertModule,
    ringModule,
  },
});

export default store;
