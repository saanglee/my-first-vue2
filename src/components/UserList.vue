<template>
  <div>
    User List
    <div v-for="user in users" :key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return { users: [] };
  },
  created() {
    axios
      .get("https://jsonplaceholder.typicode.com/users") // Promise를 리턴함
      .then((response) => {
        this.users = response.data;
        console.log(response);
      });
    console.log("이게 reponse보다 먼저 찍힘");
  },
};
</script>

<style lang="scss" scoped></style>
