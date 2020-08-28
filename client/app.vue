<template>
<main id="app">
    app, {{greeting}}
    <router-view :key="$route.fullPath"></router-view>
</main>
</template>

<script>
export default {
  name: 'app',
  metaInfo: 'app',
  data () {
    return {
      greeting: 'Hello'
    }
  },
  watch: {
      $route (to, from) {
          console.log(to);
      }
  }
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
