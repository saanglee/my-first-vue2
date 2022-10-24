import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyAqFRGJIiYHQcYnZ0LiY1ReLYOawgXyPTw",
  authDomain: "vue-todo-list-b0751.firebaseapp.com",
  projectId: "vue-todo-list-b0751",
  storageBucket: "vue-todo-list-b0751.appspot.com",
  messagingSenderId: "588178223136",
  appId: "1:588178223136:web:6b0cad1c67085d6d710c45",
  measurementId: "G-5E7L0J96RG",
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;

new Vue({ router, store, vuetify, render: (h) => h(App) }).$mount("#app");
