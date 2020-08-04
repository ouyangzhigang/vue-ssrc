import createApp from './app.js';

export default context => {
  return new Promise((resolve, reject) => {
    const {app, router, store} = createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject('no matchedComponents');
      }
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            route: router.currentRoute,
            router,
            store
          })
        }
      })).then((res) => {
        context.meta = app.$meta();
        context.state = store.state;
        context.router = router;
        resolve(app);
      })
    })
  }) 
}
