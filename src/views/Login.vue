<template>
  <div>
    <form>
      <v-text-field type="text" placeholder="E-MAIL" v-model="email" />
      <v-text-field type="text" placeholder="PASSWORD" v-model="password" />
      <v-btn @click.prevent="login" type="submit">로그인</v-btn>
      <v-btn @click="moveToRegister">회원가입</v-btn>
    </form>
    <br />
    <br />
    [User List]
    <user-list />
  </div>
</template>

<script>
import UserList from "../components/UserList.vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",
  components: {
    UserList,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("login user : ", user);
          this.$router.replace("/todo");
        })
        .catch((error) => {
          console.log(error.code, error.message);
        });
    },
    moveToRegister() {
      this.$router.push("/register");
    },
    getUser() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("uid : ", uid);
        } else {
          // User is signed out
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
