import Vue from 'vue';
import Component from './func-notification';

const Notificationtor = Vue.extend(Component);
let seed = 1;
const instances = [];

const removeInstance = (instance) => {
  if (!instance) return false;
  const len = instances.length;
  const index = instances.findIndex((item) => instance.id === item.id);

  instances.splice(index, 1);

  if (len <= 1) {
    return false;
  }
  const removeHeight = instance.vm.height || 0;
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight -16;
  }
}

const notify = (options) => {
  if (Vue.prototype.$isServer) {
    return false;
  }
  const { autoClose, ...rest } = options

  const instance = new Notificationtor({
    propsData: { ...rest },
    data: {
      autoClose: autoClose || 3000
    }
  });

  const id = `notification_${seed++}`;

  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;

  let verticalOffset = 0;
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16;
  })
  verticalOffset += 16;
  instance.verticalOffset = verticalOffset;
  instances.push(instance);

  instance.vm.$on('closed', () => {
    removeInstance(instance);
    document.body.removeChild(instance.vm.$el);
    instance.vm.$destroy();
  })

  instance.vm.$on('close', () => {
    instance.vm.visible = false;    
  })

  return instance.vm;
}

export default notify;