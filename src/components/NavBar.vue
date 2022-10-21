<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Application </v-list-item-title>
        <v-list-item-subtitle> subtext </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :path="item.path"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items:
        // routes,
        [
          { title: "Home", icon: "mdi-view-dashboard", path: "/" },
          // {
          //   title: "Menu1",
          //   icon: "mdi-view-dashboard",
          //   path: "/menu1",
          // },
          // {
          //   title: "Menu2",
          //   icon: "mdi-view-dashboard",
          //   path: "/menu2",
          // },
        ],
    };
  },
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
