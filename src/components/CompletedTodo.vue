<template>
  <v-card class="ma-3">
    <v-card-subtitle class="text-h5">
      ✨ 완료된 항목 {{ numberOfCompletedTodo }} 개
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  computed: {
    numberOfCompletedTodo() {
      return this.$store.getters["todo/numberOfCompletedTodo"];
    },
  },
};
</script>

<style lang="scss" scoped></style>
