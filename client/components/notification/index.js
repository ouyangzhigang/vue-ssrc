import Notification from './notification';
import notify from './function';

export default (Vue) => {
  Vue.component(Notification.name, Notification);
  Vue.prototype.$notify = notify;
}