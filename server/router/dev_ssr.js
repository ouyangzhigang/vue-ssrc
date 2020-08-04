const Router = require('koa-router');
const axios = require('axios');
const memory = require('memory-fs');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const VueServerRenderer = require('vue-server-renderer');

const serverRnder = require('./server_render');
const serverConfig = require('../../build/webpack.server.dev');
const serverCompiler = webpack(serverConfig);
const mfs = new memory();
serverCompiler.outputFileSystem = mfs;

let bundle;
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  stats.errors.forEach((error) => console.log(error));
  stats.warnings.forEach((warn) => console.log(warn));

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  );

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
  console.log('new bundle generated ~');
});

const handleSSR = async (context) => {
  if (!bundle) {
    context.body = 'please wait for moment ...';
    return;
  }
  const clientManifestResp = await axios.get('http://127.0.0.1:8899/dist/vue-ssr-client-manifest.json');
  const clientManifest = clientManifestResp.data;
  const template = fs.readFileSync(path.join(__dirname, '../template/server.template.ejs'), 'utf-8');

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  await serverRnder(context, renderer, template);
}

const router = new Router();
router.get('*', handleSSR);

module.exports = router;
