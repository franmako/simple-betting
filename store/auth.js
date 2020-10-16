export const state = () => ({
  user: null,
});

export const mutations = {
  set_user(store, data) {
    store.user = data;
  },
  reset_user(store) {
    store.user = null;
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
