<template>
<main class="page">
  <!-- <p>{{ greeting }} World!</p> -->
  <router-view></router-view>
</main>
</template>

<script>
module.exports = {
    data: function() {
        return {
            greeting: "Hello"
        };
    },
    watch: {
        $route (to, from) {
            console.log('router:', to);
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