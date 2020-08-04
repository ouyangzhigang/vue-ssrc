const koa = require('koa');

const app = new koa();


app.use(async (context, next) => {
  try {
    console.log(`request with path ${content.path}`);
    await next()
  } catch (err) {
    console.log(err);
    context.status = 500;
    context.body = 'please try again later!'
  }
})

