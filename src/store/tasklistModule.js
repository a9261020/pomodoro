const tasklist = {
  namespaced: true,
  state: {
    tasklist: [],
    isChecked: {},
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
    doneTask(context, id) {
      context.commit("DONETASK", id);
    },
    isChecked(context, isChecked) {
      context.commit("ISCHECKED", isChecked);
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
    DONETASK(state, id) {
      state.tasklist.forEach((task) => {
        if (task.id === id) {
          task.isCompleted = true;
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
    ISCHECKED(state, isChecked) {
      state.isChecked = isChecked;
    },
  },
  getters: {
    getTasklist: (state) => state.tasklist,
    getIsChecked: (state) => state.isChecked,
  },
};

export default tasklist;
