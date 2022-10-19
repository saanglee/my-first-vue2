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
    return { todoText: "" };
  },
  methods: {
    addTodo(event) {
      console.log("add-todo - ", event.target.value);
      this.$emit("add-todo", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
