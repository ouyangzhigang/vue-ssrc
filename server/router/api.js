const Router = require('koa-router');
const apiRouter = new Router({prefix: '/api'})

const success = (data) => {
  return {
    success: true,
    data
  }
}

apiRouter
  .get('/todos', async (ctx) => {
    const todos = await ctx.db.getAllTodos();
    console.log('api route todos --->', todos);
    ctx.body = success(todos);
  })
  .post('/todo', async (ctx) => {
    const data = await ctx.db.addTodo(ctx.request.body);
    ctx.body = success(data);
  })

module.exports = apiRouter;
