<template>
  <div>
    <v-card class="login-form">
      <v-form ref="form" class="login-form" @submit.prevent="login">
        <div class="input-container">
          <v-text-field
            v-model="email"
            type="text"
            label="E-MAIL"
            :rules="emailValidation"
            required
          />
          <v-text-field
            v-model="password"
            type="password"
            label="PASSWORD"
            :rules="pwdValidation"
            required
          />

          <div class="button-container">
            <v-btn
              v-if="isLogin"
              type="submit"
              class="button text-h6"
              color="primary"
              @click="login"
            >
              로그인
            </v-btn>
            <v-btn
              v-else
              type="submit"
              class="button text-h6"
              color="primary"
              depressed
              @click="register"
            >
              회원가입
            </v-btn>
          </div>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default {
  name: "InputForm",
  props: {
    isLogin: {
      type: Boolean,
    },
  },

  data() {
    return {
      email: "",
      password: "",
      emailValidation: [
        (value) => !!value || "이메일을 입력해주세요.",
        (value) => {
          const replacedValue = value.replace(/(\s*)/g, ""); 
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
          this.saveUserToStorage(user);
          this.$router.replace("/todo").catch(() => {});
          this.reload();
        })
        .catch((error) => {
          this.email = "";
          this.password = "";
          console.log(error.code, error.message);
          alert("이메일 또는 비밀번호를 확인해주세요.");
        });
    },
    register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.$router.push("/");
          alert(`${userCredential.user}님 회원가입이 완료되었습니다.`);
        })
        .catch((error) => {
          const { code, message } = error;
          console.log("errorCode, errorMsg : ", code, message);
        });
    },
    saveUserToStorage(user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    },
    reload() {
      window.location.reload(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 450px;
  padding: 50px 0 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .input-container {
    width: 350px;
  }

  .button {
    width: 350px;
    height: 60px;
    border: 1px solid black;
    align-self: center;
    margin: 50px 0 10px 0;
  }
  .register-box {
    width: 260px;
    display: flex;
  }
}
</style>
