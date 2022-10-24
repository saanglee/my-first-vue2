<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
        <div>
          <!-- FIXME: userEmail binding -->
          {{ userEmail }}
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
    <!-- Header -->
    <!-- <v-app-bar color="#424242" dark>
      <v-toolbar-title>ToDo App</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/"> Login</router-link>
      <v-spacer></v-spacer>
      <router-link to="/todo">ToDo</router-link>
    </v-app-bar> -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Login from "./views/Login.vue";

export default {
  name: "App",
  components: { Login },
  data: () => ({
    userEmail: "",
    cards: ["Today", "Yesterday"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
  }),
  methods: {
    getEmail() {
      const userEmail = JSON.parse(sessionStorage.getItem("user"));
      this.userEmail = userEmail.email;
    },
  },
  mounted() {
    const userEmail = JSON.parse(sessionStorage.getItem("user"));
    this.getEmail();
  },
};
</script>

<style scoped></style>
