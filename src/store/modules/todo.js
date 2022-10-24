import { collection, addDoc } from "firebase/firestore";

export default {
  namespaced: true,
  state: {
    todos: [],
  },
  mutations: {
    ADD_TODO(state) {
      console.log("add todo");
    },
  },
};
