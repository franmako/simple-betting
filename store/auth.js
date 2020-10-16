export const state = () => ({
  user: null,
});

export const mutations = {
  setUser(state, data) {
    state.user = data;
  },
  resetUser(state) {
    state.user = null;
  },
};

/* export const actions = {
  login({ commit }, data) {
    return api.auth.login(data).then((response) => {
      commit("set_user", response.data.user);
      return response;
    });
  },
}; */
