export const state = () => ({
  user: "",
});

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser }) => {
    const { uid, email, emailVerified } = authUser;
    state.user = { uid, email, emailVerified };
  },
};

export const actions = {
  onAuthStateChangedAction: (ctx, { authUser }) => {
    if (!authUser) {
      // claims = null
      // Perform logout operations
    } else {
      // Do something with the authUser and the claims object...
    }
  },
};
