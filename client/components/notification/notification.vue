<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div class="com-notification" v-show="visible" :style="style" @mouseenter="clearTimer" @mouseleave="createTimer">
      <span class="content">{{content}}</span>
      <a class="btn" @click.prevent="handleClose">{{btn}}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'notification',
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: '关闭'
    }
  },
  data () {
    return {
      visible: true
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  methods: {
    afterLeave () {
      this.$emit('close');
    },
    afterEnter () {},
    handleClose () {
      this.$emit('closed');
    },
    clearTimer () {},
    createTimer () {}
  }
}
</script>

<style lang="stylus" scoped>
.com-notification
  background: rgba(0,0,0,.5)
  color: green;
  padding: 25px 48px
  min-width: 299px
  font-size: 29px
  align-items: center
  transition: all .3s
.content 
  background: red;
</style>
