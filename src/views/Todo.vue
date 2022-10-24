<template>
  <div>
    <v-btn @click.prevent="logout">Logout</v-btn>
    <add-todo />

    <todo-list />
  </div>
</template>

<script>
import TodoList from "../components/TodoList.vue";
import TodoItem from "../components/TodoItem.vue";
import AddTodo from "../components/AddTodo.vue";
import CompletedTodo from "../components/CompletedTodo.vue";
import { getAuth, signOut } from "firebase/auth";
export default {
  name: "Todo",
  components: {
    TodoList,
    TodoItem,
    AddTodo,
    CompletedTodo,
  },
  created() {
    // session getItem ( parser )
    // undefined, null -> redirect
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      this.$router.replace("/");
      return;
    }
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          sessionStorage.removeItem("user");
          console.log("log out");
          this.$router.replace("/");
        })
        .catch((error) => console.log(error.message));
    },
  },
};
</script>

<style lang="scss" scoped></style>
