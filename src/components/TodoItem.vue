<template>
  <v-col>
    <v-card class="pa-5 d-flex justify-space-between align-center">
      <v-checkbox
        type="checkbox"
        :checked="todo.checked"
        @change="toggleCheckbox"
      />
      <v-card-text
        class="text-body-1"
        :class="todo.checked ? 'text-decoration-line-through' : ''"
      >
        {{ todo.text }}
      </v-card-text>

      <v-btn class="btn btn-danger btn-sm" @click="clickDelete" color="error"
        >Delete</v-btn
      >
    </v-card>
  </v-col>

  <!-- {{ numberOfCompletedTodo }} -->
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    numberOfCompletedTodo() {
      return this.$store.getters["todo/numberOfCompletedTodo"];
    },
  },
  methods: {
    toggleCheckbox(event) {
      // console.log(event);
      this.$store.dispatch("todo/toggleTodo", {
        id: this.todo.id,
        checked: event,
        // checked: event.target.value,
      });
    },
    clickDelete() {
      this.$store.dispatch("todo/deleteTodo", this.todo.id);
      // this.$store.commit("DELETE_TODO", this.todo.id);
      // this.$emit('click-delete', this.todo.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
