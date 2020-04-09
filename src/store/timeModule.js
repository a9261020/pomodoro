const time = {
  namespaced: true,
  state: {
    workTime: 0,
    totalSeconds: 0,
  },
  actions: {
    setupWorkTime(context, workTime) {
      context.commit("SETUPWORKTIME", workTime);
    },
  },
  mutations: {
    SETUPWORKTIME(state, workTime) {
      state.workTime = workTime;
      state.totalSeconds = workTime * 60;
    },
  },
  getters: {
    getWorkTime: (state) => state.workTime,
    getTotalSeconds: (state) => state.totalSeconds,
  },
};

export default time;
