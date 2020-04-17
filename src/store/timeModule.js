const time = {
  namespaced: true,
  state: {
    task: {
      taskTime: 25,
      taskTotalSeconds: 1500,
    },
    break: {
      breakTime: 5,
      breakTotalSeconds: 1500,
    },
    isStart: false,
  },
  actions: {
    setuptaskTime(context, taskTime) {
      context.commit("SETUPTASKTIME", taskTime);
    },
    setupbreakTime(context, breakTime) {
      context.commit("SETUPBREAKTIME", breakTime);
    },
    taskStart(context, isStart) {
      context.commit("TASKSTART", isStart);
    },
  },
  mutations: {
    SETUPTASKTIME(state, taskTime) {
      state.task.taskTime = taskTime;
      state.task.taskTotalSeconds = taskTime * 60;
    },
    SETUPBREAKTIME(state, breakTime) {
      state.break.breakTime = breakTime;
      state.break.breakTotalSeconds = breakTime * 60;
    },
    TASKSTART(state, isStart) {
      state.isStart = isStart;
    },
  },
  getters: {
    getTask: (state) => state.task,
    getBreak: (state) => state.break,
    getIsStart: (state) => state.isStart,
  },
};

export default time;
