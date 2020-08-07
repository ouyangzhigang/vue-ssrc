<template>
  <div class="a-page">
    <p>
      page {{name}}
    </p>
    <h1>what is it, no content</h1>

    <button @click="notify">click notify</button>
  </div>
</template>

<script>
export default {
  mataInfo: {
    title: 'page a'
  },
  data () {
    return {
      name: 'a'
    }
  },
  methods: {
    notify () {
      this.$notify({
        content: 'hello world!',
        btn: 'close x'
      })
    }
  }
}
</script>

