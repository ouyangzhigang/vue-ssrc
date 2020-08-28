const Router = require('koa-router');
const send = require('koa-send');

const staticRouter = new Router({prefix: '/dist'})

staticRouter.get('/*', async ctx => {
  console.log('static path --->', ctx.path);
  await send(ctx, ctx.path);
})

module.exports = staticRouter;
