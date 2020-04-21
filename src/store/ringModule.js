const ring = {
  namespaced: true,
  state: {
    selected: {
      name: "from ringModule name",
      id: "id",
    },
  },
  actions: {
    selectRing(context, ring) {
      context.commit("SELECT_RING", ring);
    },
  },
  mutations: {
    SELECT_RING(state, ring) {
      console.log(ring);
      state.selected = ring;
    },
  },
  getters: {
    getSelected: (state) => state.selected,
  },
};

export default ring;
