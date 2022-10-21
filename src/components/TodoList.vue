<template>
  <div>
    <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
export default {
  components: {
    TodoItem,
  },
  computed: {
    todos() {
      return this.$store.state.todo.todos;
    },
  },
};
</script>

<style lang="scss" scoped></style>
