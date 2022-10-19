<template>
  <div id="app" class="container">
    <h1 class="text-center">APP</h1>
    <complted-todo />
    <add-todo />
    <hr />
    <todo-list />
    <user-list />
  </div>
</template>

<script>
/* eslint-disable */
import TodoList from "./components/TodoList.vue";
import AddTodo from "./components/AddTodo.vue";
import CompltedTodo from "./components/CompletedTodo.vue";
import UserList from "./components/UserList.vue";

export default {
  components: {
    AddTodo,
    CompltedTodo,
    TodoList,
    UserList,
  },
};
</script>

<style></style>
