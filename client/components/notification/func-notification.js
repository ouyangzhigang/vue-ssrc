import Notification from './notification';

export default {
  extends: Notification,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`,
        opacity: 0.75
      }
    }
  },
  data () {
    return {
      verticalOffset: 0,
      height: 0,
      autoClose: 3000,
      visible: false
    }
  },
  methods: {
    createTimer() {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false;
        }, this.autoClose);
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    afterEnter () {
      this.height = this.$el.offsetHeight;
    }
  },
  beforeDestory () {
    this.clearTimer();
  }
}