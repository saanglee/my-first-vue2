<template>
  <div id="app">
    <nav>
      <router-link to="/">Login</router-link> |
      <router-link to="/todo">ToDo</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
