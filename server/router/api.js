const Router = require('koa-router');
const apiRouter = new Router({prefix: '/api'})

const success = (data) => {
  return {
    success: true,
    data
  }
}

apiRouter.get('/todo', async (ctx) => {
  const todos = await ctx.db.getAllTodos();
  ctx.body = success(todos);
})

module.exports = apiRouter;
