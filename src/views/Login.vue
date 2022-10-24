<template>
  <div>
    <v-card width="400" class="login-form">
      <input-form isLogin="true" />
      <!-- <v-form ref="form" @submit.prevent="login">
        <div class="input-container">
          <v-text-field
            type="text"
            label="E-MAIL"
            v-model="email"
            :rules="emailValidation"
            required
          />
          <v-text-field
            type="text"
            label="PASSWORD"
            v-model="password"
            :rules="pwdValidation"
            required
          />
        </div>
        <button @click.prevent="login" type="submit" class="login-btn">
          로그인
        </button>
      </v-form> -->
      <div class="register-box">
        <v-card-text>아직 회원이 아니신가요?</v-card-text>
        <v-btn plain @click="moveToRegister" class="pt-4">회원가입</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import UserList from "../components/UserList.vue";
import InputForm from "../components/InputForm.vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",
  components: {
    UserList,
    InputForm,
  },
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
      emailValidation: [
        (value) => !!value || "이메일을 입력해주세요.",
        (value) => {
          const replacedValue = value.replace(/(\s*)/g, ""); // 필드에 들어간 모든 빈칸을 제거
          const regex =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
          return regex.test(replacedValue) || "이메일 형식을 확인해주세요.";
        },
      ],
      pwdValidation: [
        (value) => !!value || "비밀번호를 입력해주세요,",
        (value) => {
          const replacedValue = value.replace(/(\s*)/g, "");
          return replacedValue.length >= 2 || "2자리 이상 입력해주세요.";
        },
      ],
    };
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          sessionStorage.setItem("user", JSON.stringify(user));
          this.$router.replace("/todo").catch(() => {});
        })
        .catch((error) => {
          this.email = "";
          this.password = "";
          console.log(error.code, error.message);
          alert("이메일 또는 비밀번호를 확인해주세요.");
        });
    },
    moveToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  padding: 30px 0 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .input-container {
    width: 300px;
  }
  .login-btn {
    width: 100%;
    border: 1px solid black;
    align-self: center;
    margin: 10px 0 10px 0;
  }
  .register-box {
    width: 260px;
    display: flex;
    // padding-right: 30px;
  }
}
</style>
