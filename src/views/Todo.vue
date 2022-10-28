<template>
  <div>
    <div class="d-flex justify-end">
      <v-btn
        @click.prevent="logout"
        class="mt-2 mr-4 text-h6"
        color="#757575"
        dark
        large
        rounded
        >Logout</v-btn
      >
    </div>
    <add-todo v-on:addTodo="addTodo" />
    <todo-list
      v-bind:todoProps="todos"
      v-bind:completedTodos="completedTodos"
      v-on:deleteTodoById="deleteTodo"
      v-on:toggleCheckBox="toggleCheckBox"
    />
  </div>
</template>

<script>
import TodoList from "../components/TodoList.vue";
import AddTodo from "../components/AddTodo.vue";
import db from "../main";

import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "Todo",
  components: {
    TodoList,

    AddTodo,
  },
  data() {
    return {
      todos: [],
      completedTodos: 0,
    };
  },

  methods: {
    async toggleCheckBox({ targetId, current }) {
      console.log(targetId, current);
      const targetItem = doc(db, "todos", targetId);
      await updateDoc(targetItem, {
        completed: !current,
      });
    },
    async deleteTodo(targetId) {
      const filteredTodos = this.todos.filter((todo) => todo.id !== targetId);
      await deleteDoc(doc(db, "todos", targetId));
      this.todos = filteredTodos;
    },
    async addTodo(newTodo) {
      const newItem = { todo: newTodo, completed: false, isEditable: false };
      if (newItem.todo) {
        await addDoc(collection(db, "todos"), newItem);
        this.todos.unshift(newItem);
      }
      return;
    },
    async getTodos() {
      const querySnapShot = await getDocs(collection(db, "todos"));
      querySnapShot.forEach((doc) => {
        this.todos.push({
          id: doc.id,
          todo: doc.data().todo,
          completed: doc.data().completed,
          isEditable: false,
        });
      });
      // this.getCompletedTodos();
    },

    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          sessionStorage.removeItem("user");
          this.$router.replace("/");
          window.location.reload(true);
        })
        .catch((error) => console.log(error.message));
    },
    // getCompletedTodos() {
    //   const parsedTodos = JSON.parse(JSON.stringify(this.todos));
    //   const numberOfCompleted = parsedTodos.filter(
    //     (todo) => todo.completed === true
    //   ).length;
    //   console.log(numberOfCompleted);
    //   this.completedTodos = numberOfCompleted;
    // },
    // test2() {
    //   this.getCompletedTodos();
    // },
  },
  computed: {
    numberOfCompletedTodo() {
      return this.todos.filter((todo) => todo.completed).length;
    },
  },
  created() {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      this.$router.replace("/");
      return;
    }
  },
  mounted() {
    this.addTodo();
    this.getTodos();
    // this.test();
  },
};
</script>

<style scoped></style>
