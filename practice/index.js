import Vue from "vue";
import VueRouter from 'vue-router';
import App from "./app.vue";
import createRouter from '../client/router/index';

Vue.use(VueRouter);
Vue.config.productionTip = false;
const routers = createRouter();

new Vue({
  router: routers,
  template: '<App />',
  components: {App}
  // render: h => (App)
}).$mount('#app');
