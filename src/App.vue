<template>
  <div id="app" class="container">
    <h1 class="text-center">APP</h1>

    <complted-todo :todos="todos" />
    <add-todo @add-todo="addTodo" />
    <todo-list
      :todos="todos"
      @toggle-checkbox="toggleCheckbox"
      @click-delete="deleteTodo"
    />

    <hr />
  </div>
</template>

<script>
/* eslint-disable */
import AddTodo from "./components/AddTodo.vue";
import CompltedTodo from "./components/CompletedTodo.vue";
import TodoList from "./components/TodoList.vue";
export default {
  name: "App",
  components: {
    AddTodo,
    CompltedTodo,
    TodoList,
  },
  data() {
    return {
      todoText: "",
      todos: [
        { id: 1, text: "buy a car", checked: false },
        { id: 2, text: "play game", checked: false },
      ],
    };
  },
  methods: {
    addTodo(value) {
      console.log("App - ", value);
      this.todos.push({
        id: Math.random(),
        text: value,
        checked: false,
      });
      this.todoText = "";
    },
    deleteTodo(id) {
      console.log("id: ", id);
      const index = this.todos.findIndex((todo) => {
        return todo.id === id;
      });
      console.log("index: ", index);
      this.todos.splice(index, 1);
    },
    toggleCheckbox({ id, checked }) {
      console.log(id, checked);
      const index = this.todos.findIndex((todo) => {
        return todo.id === id;
      });
      this.todos[index].checked = checked;
    },
  },
};
</script>

<style></style>
