<template>
  <div>
    <v-text-field
      label="할 일을 작성해 보세요."
      @keyup.enter="addTodo"
      class="ma-3 text-h5"
    />
  </div>
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
