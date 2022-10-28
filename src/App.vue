<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <h1 class="text-h3">To Do It!</h1>
        <v-card class="mt-3">
          <v-card-subtitle class="text-h5">
            🗓 오늘 <br />
            {{ getDate }}
          </v-card-subtitle>
        </v-card>
        <div class="text-h6 ma-3">
          {{ this.$store.state.user.user.userId }}
        </div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",

  data: () => ({
    userEmail: "",
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Menu1"],
      ["mdi-send", "Menu2"],
      ["mdi-delete", "Trash"],
    ],
  }),
  methods: {},
  computed: {
    getDate() {
      const today = new Date();
      return today.toLocaleDateString();
    },

    getIdfromEmail() {
      const email = this.$store.state.user.user.userId;
      const id = email.split("@")[0];
      return id;
    },
  },
};
</script>

<style scoped></style>
