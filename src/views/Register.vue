<template>
  <form>
    <v-text-field type="text" placeholder="E-MAIL" v-model="email" />
    <v-text-field type="text" placeholder="PASSWORD" v-model="password" />
    <v-btn @click="goBack">뒤로 가기</v-btn>
    <v-btn @click.prevent="register" type="submit">회원 가입</v-btn>
  </form>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    register() {
      console.log(this.email, this.password);
      // this.$store.dispatch("user/addUser", event.target.value);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user : ", user);
          alert("회원가입이 완료되었습니다.");
          this.$router.replace("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMsg = error.message;
          console.log("errorCode, errorMsg : ", errorCode, errorMsg);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
