<template>
  <div>
    <v-card class="login-form">
      <v-form ref="form" @submit.prevent="login">
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
        <button @click="login" type="submit" class="login-btn" v-if="isLogin">
          로그인
        </button>
        <button
          @click="register"
          type="submit"
          class="login-btn"
          v-else-if="!isLogin"
        >
          회원가입
        </button>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import UserList from "../components/UserList.vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "InputForm",
  props: [{ isLogin: true }],

  components: {
    UserList,
  },
  data() {
    return {
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
          console.log("login user : ", user);
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
  computed: {
    buttonText() {
      if (this.isLogin) {
        return "로그인";
      }
      return "회원가입";
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 400px;
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
