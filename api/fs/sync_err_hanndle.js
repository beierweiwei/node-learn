//同步错误处理，任何异常都会被立即抛出
const fs = require('fs');

fs.unlinkSync('/temp/hello');
console.log('成功删除/temp/hello');