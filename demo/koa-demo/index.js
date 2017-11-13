const koa = require('koa');
const app = new koa();
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// app.use(async (ctx, next) => {
// 	const start = Date.now();
// 	await next();
// 	const ms = Date.now() - start;
// 	ctx.set('X-Response-Time', `${ms}ms`)
// })

// app.use(async (ctx, next) => {
// 	const start = Date.now();
// 	await next();
// 	const ms = Date.now() - start;
// 	console.log(`${ctx.method} ${ctx.url} - ${ms}`);
// })

//response
// app.use(async ctx => {
// 	 var ct = 'hellow world';
// 	 ctx.body = ct;
// })

// const home = new Router();

// home.get('', async (ctx) => {
// 	let html = `
// 	  <ul>
// 	    <li><a href="/page/helloworld">/page/helloworld</a></li>
// 	    <li><a href="/page/404">/page/404</a></li>
// 	  </ul>
// 	`;
// 	ctx.body = html;
// })

// let page = new Router();
// page.get('/404', async (ctx) => {
// 	ctx.body = '404 page!'
// }).get('/helloworld', async (ctx) => {
// 	ctx.body = 'helloword page!';
// })

// const router = new Router;
// router.use('/', home.routes(), home.allowedMethods())
// router.use('/page', page.routes(), page.allowedMethods())

// // 加载路由中间件
// app.use(router.routes()).use(router.allowedMethods())
// 
//get 请求获取数据
// app.use(async (ctx) => {
// 	let url = ctx.url;
// 	let request = ctx.request;
// 	let req_query = ctx.request.query;
// 	let req_querystring = request.querystring;

// 	let ctx_query = ctx.query;
// 	let ctx_querystring = ctx.querystring;
// 	ctx.body = {
// 		url,
// 		req_query,
// 		req_querystring,
// 		ctx_query,
// 		ctx_querystring,
// 	}
// })
// 
app.use(async (ctx) => {
	if(ctx.url === '/' && ctx.method === 'GET') {
		let html = `
		  <h1>koa2 request post demo</h1>
		  <form method="POST" action="/">
		    <p>userName</p>
		    <input name="userName" /><br/>
		    <p>nickName</p>
		    <input name="nickName" /><br/>
		    <p>email</p>
		    <input name="email" /><br/>
		    <button type="submit">submit</button>
		  </form>
		
		`
		ctx.body = html
	}else if(ctx.url && ctx.method === 'POST') {
		let postData = ctx.request.body
		ctx.body = postData;
	}else {
		ctx.body = '<h1>404</h1>'
	}
})

// function parsePostData(ctx) {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			let postdata = '';
// 			ctx.req.addListener('data', (data) => {
// 				postdata += data
// 			})
// 			ctx.req.addListener('end', function(){
// 				let parseData = parseQueryStr( postdata)
// 				resolve(parseData)
// 			})
// 		}catch(err) {
// 			reject(err)
// 		}
// 	})
// }

// function parseQueryStr(queryStr) {
// 	let queryData = {}
// 	let queryStrList = queryStr.split('&')
// 	console.log(queryStrList)
// 	for(let [index, queryStr] of queryStrList.entries()) {
// 		let itemList = queryStr.split('=')
// 		queryData[itemList[0]] = decodeURIComponent(itemList[1])
// 	}
// 	return queryData
// }

app.listen(3000);

// const Koa = require('koa')
// const app = new Koa()
// const bodyParser = require('koa-bodyparser')

// // 使用ctx.body解析中间件
// app.use(bodyParser())

// app.use( async ( ctx ) => {

//   if ( ctx.url === '/' && ctx.method === 'GET' ) {
//     // 当GET请求时候返回表单页面
//     let html = `
//       <h1>koa2 request post demo</h1>
//       <form method="POST" action="/">
//         <p>userName</p>
//         <input name="userName" /><br/>
//         <p>nickName</p>
//         <input name="nickName" /><br/>
//         <p>email</p>
//         <input name="email" /><br/>
//         <button type="submit">submit</button>
//       </form>
//     `
//     ctx.body = html
//   } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
//     // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
//     let postData = ctx.request.body
//     ctx.body = postData
//   } else {
//     // 其他请求显示404
//     ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
//   }
// })

// app.listen(3000, () => {
//   console.log('[demo] request post is starting at port 3000')
// })