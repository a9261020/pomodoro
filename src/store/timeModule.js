const time = {
  namespaced: true,
  state: {
    workTime: 25,
    breakTime: 5,
    totalSeconds: 1500,
    isStart: false
  },
  actions: {
    setupWorkTime(context, workTime) {
      context.commit("SETUPWORKTIME", workTime);
    },
    setupBreakTime(context, BreakTime) {
      context.commit("SETUPBREAKTIME", BreakTime);
    },
    taskStart(context, isStart) {
      context.commit("TASKSTART", isStart);
    }
  },
  mutations: {
    SETUPWORKTIME(state, workTime) {
      state.workTime = workTime;
      state.totalSeconds = workTime * 60;
    },
    SETUPBREAKTIME(state, breakTime) {
      state.breakTime = breakTime;
      state.totalSeconds = breakTime * 60;
    },
    TASKSTART(state, isStart) {
      state.isStart = isStart;
    }
  },
  getters: {
    getWorkTime: state => state.workTime,
    getTotalSeconds: state => state.totalSeconds,
    getIsStart: state => state.isStart
  }
};

export default time;
