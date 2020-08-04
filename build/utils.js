const path = require('path');

// 定义
const Resolve = (d) => path.join(__dirname, `../${d}`);

/** 输出 */
exports.Resolve = Resolve;