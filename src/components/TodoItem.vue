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
</template>

<script>
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import db from "../main";

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
      this.$store.dispatch("todo/toggleTodo", {
        id: this.todo.id,
        checked: event,
      });
    },
    clickDelete() {
      this.$store.dispatch("todo/deleteTodo", this.todo.id);
    },
    // ✨ Delete Todo from firbase by id
    async _clickDelete() {
      const targetId = "ybMKTsE6geru35MCPY3H";
      await deleteDoc(doc(db, "todos", targetId));
    },
    // ✨ Update Todo by id
    async updateTodo() {
      const targetId = "RsgRXs74XfkOPOI0EGaO";
      const targetItem = doc(db, "todos", targetId);
      await updateDoc(targetItem, {
        todoText: "내용 수정 테스트",
      });
    },
  },
  // 👩‍🔬 Test
  mounted() {
    this._clickDelete();
    this.updateTodo();
  },
};
</script>

<style lang="scss" scoped></style>
