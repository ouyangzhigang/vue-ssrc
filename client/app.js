import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Meta from 'vue-meta';

import App from './app.vue';
import createStore from './store/index';
import createRouter from './router/index';
import Notifycation from './components/notification';

import './assets/styles/global.styl';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Meta);
Vue.use(Notifycation);

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

export default () => {
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    router,
    store,
    template: '<App/>',
    components: { App }
  });

  return { app, store, router };
}
