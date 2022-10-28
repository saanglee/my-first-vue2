<template>
  <div>
    <v-row justify="center">
      <v-col cols="10">
        <v-textarea
          label="할 일을 작성해 보세요. 💬 "
          v-model="newTodo"
          @keyup.enter="addTodoFromChild"
          class="text-h5 mt-13"
          auto-grow
          outlined
          rows="3"
          shaped
          filled
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    addTodoFromChild() {
      if (this.newTodo !== "") {
        this.$emit("addTodo", this.newTodo);
      } else {
        alert("1자 이상 입력해주세요.");
      }
      this.clearInput();
    },
    clearInput() {
      this.newTodo = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
