const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = path.join(__dirname + '/static');
app.use(static(staticPath));
app.use((ctx, next) => {
	// if(ctx.url.indexOf('/static') !== -1) {
		
	// }else {
	// 	ctx.body = 'hello world';
	// }
})
app.listen(3000, () => {
  console.log('[demo] static-use-middleware is starting at port 3000')
})