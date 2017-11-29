var Koa = require('koa');
var app = new Koa();
var session = require('koa-session');
var redisStroe = require('koa-redis');
app.keys = ['secret'];
app.use(session({
  key: 'wjj:id',
  maxAge: 86400000,
  overwrite: false,
  httpOnly: true,
  signed: true,
  rolling: false,
  store: redisStroe({

  }),
}, app));
app.use(ctx => {
	if(ctx.path === '/favicon.ico') return;
	let n = ctx.session.views || 0;
	ctx.session.views = ++n;
	ctx.body = n + 'views';
})
app.listen(9000);
console.log('app listen port 3000');