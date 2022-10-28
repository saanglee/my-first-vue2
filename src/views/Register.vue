<template>
  <div
    class="register-container d-flex flex-column align-center justify-center"
  >
    <v-btn @click="goBack" class="go-back-btn" large>뒤로 가기</v-btn>
    <input-form :isLogin="false" />
  </div>
</template>

<script>
import InputForm from "../components/InputForm.vue";

export default {
  name: "Register",
  components: {
    InputForm,
  },
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
  },
};
</script>

<style lang="scss" scoped>
.register-container {
  height: 100vh;
}
.go-back-btn {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
