import Router from 'vue-router';

const Component = (layout) => () => import(/* webpackChunkName: "[request]" */`../layout/${layout}`);

const routes = [
  {
    path: '/',
    redirect: '/a'
  },
  {
    path: '/a',
    name: 'a',
    component: Component('a')
  },
  {
    path: '/b',
    name: 'b',    
    component: Component('b')
  },
  {
    path: '/c',
    name: 'c',    
    component: Component('c')
  }
]

export default () => {
  return new Router({
    mode: 'history',
    routes,
    fallback: true
  });
}