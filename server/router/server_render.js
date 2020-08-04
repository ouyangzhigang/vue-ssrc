const ejs = require('ejs');

module.exports = async (context, renderer, template) => {
  context.headers['Content-Type'] = 'text/html';
  const content = { url: context.path };

  try {
    const appString = await renderer.renderToString(content);

    const { title } = context.meta.inject();

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