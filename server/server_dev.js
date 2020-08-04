const Koa = require('koa');
const send = require('koa-send');
const path = require('path');
const pageRouter = require('./router/dev_ssr.js');

const app = new Koa();


app.use(async (context, next) => {
  try {
    console.log(`request with path ${context.path}`);
    await next();
  } catch (err) {
    console.log('server lanuch failure', err);
    context.status = 500;
    context.body = err.message;
  }
});

app.use(async (ctx, next) => {
  if(ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') });
  } else {
    await next();
  }
})

app.use(pageRouter.routes()).use(pageRouter.allowedMethods());

app.listen(3333, '0.0.0.0', () => {
  console.log('server is listening on http://localhost:3333/dist/');
})