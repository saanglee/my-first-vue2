import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
      // returns the user object from the state
    },
  },

  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  /**
  Mutations allow us to make changes to our state; 
  SET_LOGGED_IN
   */
};
