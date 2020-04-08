const tasklist = {
  namespaced: true,
  state: {
    tasklist: [],
  },
  actions: {
    addTask(context, task) {
      context.commit("ADDTASK", task);
    },
    deleteTask(context, id) {
      context.commit("DELETETASK", id);
    },
    editTask(context, afterEdit) {
      context.commit("EDITTASK", afterEdit);
    },
  },
  mutations: {
    ADDTASK(state, task) {
      state.tasklist.push(task);
      localStorage.setItem("tasklist", JSON.stringify(state.tasklist));
    },
    DELETETASK(state, id) {
      state.tasklist.splice(state.tasklist.indexOf(id), 1);
      localStorage.setItem("tasklist", JSON.stringify(state.tasklist));
    },
    EDITTASK(state, afterEdit) {
      state.tasklist.forEach((task) => {
        if (task.id === afterEdit.id) {
          task.taskTitle = afterEdit.afterEdit;
        }
      });
      localStorage.setItem("tasklist", JSON.stringify(state.tasklist));
    },
    GETFROMLOCAL(state) {
      const tasklist = JSON.parse(localStorage.getItem("tasklist"));
      if (tasklist !== null) {
        state.tasklist = tasklist;
      }
    },
  },
  getters: {
    getTasklist(state) {
      return state.tasklist;
    },
  },
};

export default tasklist;
