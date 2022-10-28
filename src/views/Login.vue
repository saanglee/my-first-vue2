<template>
  <div class="login-container d-flex flex-column align-center justify-center">
    <input-form :isLogin="true" />

    <div class="register-box">
      <span>아직 회원이 아니신가요?</span>
      <v-btn
        plain
        @click="moveToRegister"
        class="text-body-1"
        >회원가입</v-btn
      >
    </div>
  </div>
</template>

<script>
import InputForm from "../components/InputForm.vue";

export default {
  name: "Login",
  components: {
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
    moveToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
}
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
