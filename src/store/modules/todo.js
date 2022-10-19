export default {
  namespaced: true,
  state: {
    todos: [
      { id: 1, text: "buy a car", checked: false },
      { id: 2, text: "play game", checked: false },
    ],
  },
  mutations: {
    ADD_TODO(state, value) {
      state.todos.push({
        id: Math.random(),
        text: value,
        checked: false,
      });
    },
    TOGGLE_TODO(state, { id, checked }) {
      const index = state.todos.findIndex((todo) => {
        return todo.id === id;
      });
      state.todos[index].checked = checked;
    },
    DELETE_TODO(state, todoId) {
      const index = state.todos.findIndex((todo) => {
        return todo.id === todoId;
      });
      state.todos.splice(index, 1);
    },
  },

  actions: {
    // 보통 비동기 작업을 하고 state의 데이터를 변경할 때 actions를 사용
    addTodo({ commit, dispatch }, value) {
      console.log("commit: ", commit);
      console.log("dispatch: ", dispatch);
      console.log(" value: ", value);
      // {commit} ??
      setTimeout(function () {
        commit("ADD_TODO", value);
      }, 200);
    },
    toggleTodo({ commit }, payload) {
      setTimeout(function () {
        commit("TOGGLE_TODO", payload);
      }, 200);
    },
    deleteTodo({ commit }, todoId) {
      setTimeout(function () {
        commit("DELETE_TODO", todoId);
      }, 200);
    },
  },
  // getters ??
  getters: {
    numberOfCompletedTodo: (state) => {
      return state.todos.filter((todo) => todo.checked).length;
    },
  },
};
