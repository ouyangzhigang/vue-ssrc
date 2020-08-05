const Router = require('koa-router');
const VueServerRender = require('vue-server-renderer');
const path = require('path');
const fs = require('fs');

const clientManifest = require('../../dist/vue-ssr-client-manifest.json');
const serverRender = require('./server_render.js');

const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
);

const template = fs.readFileSync(
  path.join(__dirname, '../template/server.template.ejs'),
  'utf-8'
);

const pageRouter = new Router();

pageRouter.get('*', async (context) => {
  await serverRender(context, renderer, template);
})

module.exports = pageRouter;
