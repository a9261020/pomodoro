const alert = {
  namespaced: true,
  state: {
    message: "",
  },
  actions: {
    showMessage(context, message) {
      context.commit("SHOWMESSAGE", message);
      context.dispatch("removeMessageByTime");
    },
    removeMessageByTime(context) {
      context.commit("REMOVEMESSAGEBYTIME");
    },
    removeMessage(context) {
      context.commit("REMOVEMESSAGE");
    },
  },
  mutations: {
    SHOWMESSAGE(state, message) {
      state.message = message;
    },
    REMOVEMESSAGEBYTIME(state) {
      setTimeout(() => {
        state.message = "";
      }, 1500);
    },
    REMOVEMESSAGE(state) {
      state.message = "";
    },
  },
  getters: {
    getMessage: (state) => state.message,
  },
};

export default alert;
