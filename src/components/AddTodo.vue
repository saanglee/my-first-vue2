<template>
  <input
    v-model="todoText"
    type="text"
    class="w-100 p-2"
    placeholder="Type todo"
    @keyup.enter="addTodo"
  />
</template>

<script>
export default {
  data() {
    return {
      todoText: "",
    };
  },
  methods: {
    addTodo(event) {
      // this.$store.commit("ADD_TODO", event.target.value); // .commit('mutation', value)
      this.$store.dispatch("todo/addTodo", event.target.value); // .dispatch('action', value)
      this.todoText = "";
      // this.$emit('add-todo', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
