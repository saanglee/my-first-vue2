<template>
  <div>
    <v-container class="px-6">
      <v-card class="ma-3" dark color="primary">
        <v-card-subtitle class="text-h5 font-weight-bold" color="primary">
          ✨ 완료된 항목 {{ getCompletedTodos }}개
        </v-card-subtitle>
      </v-card>
      <v-card v-for="(todo, index) in todoProps" :key="index" class="ma-3">
        <v-col>
          <v-row>
            <v-col cols="1" class="checkbox-container d-flex justify-center">
              <v-checkbox
                @change="toggleCheckBox(todo)"
                v-model="todo.completed"
                class="checkbox"
              />
            </v-col>
            <v-col cols="8">
              <v-card-text
                class="text-body-1 mt-2"
                :class="[
                  todo.completed
                    ? 'text--secondary text-decoration-line-through'
                    : '',
                ]"
                v-if="!todo.isEditable"
              >
                <span>{{ todo.todo }}</span>
              </v-card-text>
              <v-text-field
                rows="1"
                v-else-if="todo.isEditable"
                v-model="todo.todo"
                @keyup.enter="handleClickSave(todo)"
                class="pa-0"
              ></v-text-field>
            </v-col>
            <v-col cols="3" class="d-flex justify-end mt-4">
              <v-btn
                v-if="!todo.isEditable"
                @click="todo.isEditable = !todo.isEditable"
                class="mr-2"
              >
                <v-icon left> {{ icons.mdiPencil }} </v-icon>
                수정</v-btn
              >
              <v-btn
                class="mr-2"
                v-if="todo.isEditable"
                @click="handleClickSave(todo)"
                color="green"
                dark
              >
                <v-icon left> {{ icons.mdiPencil }} </v-icon>저장</v-btn
              >
              <v-btn
                value="todo.id"
                @click="deleteTodoFromChild(todo.id)"
                color="error"
                dark
              >
                <v-icon left>
                  {{ icons.mdiDelete }}
                </v-icon>
                삭제</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mdiPencil, mdiDelete } from "@mdi/js";
import { doc, updateDoc } from "firebase/firestore";
import db from "../main";

export default {
  props: ["todoProps", "completedTodos"],
  data() {
    return {
      todo: "",
      editedTodo: "",
      icons: {
        mdiPencil,
        mdiDelete,
      },
    };
  },

  methods: {
    deleteTodoFromChild(targetId) {
      this.$emit("deleteTodoById", targetId);
    },
    handleClickSave(todo) {
      let newTodo = todo.todo;
      todo.isEditable = !todo.isEditable;
      this.updateTodo(todo.id, newTodo);
      todo.todo = newTodo;
    },
    async updateTodo(targetId, editedTodo) {
      const targetItem = doc(db, "todos", targetId);
      await updateDoc(targetItem, {
        todo: editedTodo,
      });
    },
    async toggleCheckBox(todo) {
      const newCheck = todo.completed;
      const targetItem = doc(db, "todos", todo.id);
      await updateDoc(targetItem, {
        completed: newCheck,
      });
      this.$emit("test", true);
    },
  },
  computed: {
    getCompletedTodos() {
      const numberOfCompleted = this.todoProps.filter(
        (todo) => todo.completed === true
      ).length;
      return numberOfCompleted;
    },
  },
};
</script>

<style lang="scss" scoped>
.item-content {
  height: 30px;
  padding: 0 0 0 30px;
}

.checkbox-container {
  width: 10px;
}
</style>
