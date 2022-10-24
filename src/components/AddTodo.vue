<template>
  <div>
    <v-text-field
      label="할 일을 작성해 보세요."
      @keyup.enter="addTodo"
      class="ma-3 text-h5"
      v-model="todoText"
    />
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import db from "../main";

export default {
  data() {
    return {
      todoText: "",
      checked: false,
    };
  },
  methods: {
    // ✨ Add Todo to firbase
    async addTodo() {
      if (this.todoText.length > 1) {
        console.log("this.todoTex : ", this.todoText);
        await addDoc(collection(db, "todos"), {
          todoText: this.todoText,
          checked: false,
        });
        this.$store.todo.commit("ADD_TODO");
      }
      alert("1자 이상 입력해주세요.");
    },
    clearInput() {
      this.todoText = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
