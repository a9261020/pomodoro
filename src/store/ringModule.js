const ring = {
  namespaced: true,
  state: {
    selected: {
      name: "",
      id: "",
    },
  },
  actions: {
    selectRing(context, ring) {
      if (localStorage.getItem("ring") === null) return;
      ring = JSON.parse(localStorage.getItem("ring"));
      context.commit("SELECT_RING", ring);
    },
  },
  mutations: {
    SELECT_RING(state, ring) {
      state.selected = ring;
    },
  },
  getters: {
    getSelected: (state) => state.selected,
  },
};

export default ring;
