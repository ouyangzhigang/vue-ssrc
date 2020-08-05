const ejs = require('ejs');

module.exports = async (context, renderer, template) => {
  context.headers['Content-Type'] = 'text/html';
  const content = { url: context.path };

  try {
    const appString = await renderer.renderToString(content);

    if (content.router.currentRoute.fullPath !== context.path) {
      return context.redirect(content.router.currentRoute.fullPath);
    }

    const { title } = content.meta.inject();

    const html = ejs.render(template, {
      title: title.text(),
      appString,
      style: content.renderStyles(),
      scripts: content.renderScripts()
    })
    context.body = html;
  } catch (err) {
    console.log('render error', err);
    throw err;
  }
}