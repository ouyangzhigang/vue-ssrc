import Vue from "vue";
import VueRouter from 'vue-router';

import App from "./app.vue";
import createRouter from './router/index';

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = createRouter();

new Vue({
  router,
  // render: h => (App),
  template: '<App />',
  components: {App}
}).$mount('#app');
