var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
// http.createServer(function(req, res) {
// 	console.log(req.method, req.headers);
// 	req.setHeader('Content-Type', 'application/json');
// 	res.writeHead(200, {'Content-type': 'text-plain'});
// 	res.end('Hello World\n');
// }).listen(8124);
// 
// http.createServer(function (req, res) {
// 		var req_url = url.parse(req.url);
// 		var pathname = path.join('./', req_url.pathname);
// 		try {
// 			var fd = fs.readFileSync(pathname);
// 		res.setHeader('X-Foo', 'bar');
// 		res.writeHead(200, {'Content-Type': 'text/html'})
// 		res.end(fd);
// 	}	catch(err) {
// 		console.log(err);
// 	}
// }).listen(80);


http.createServer(function (req, res) {
		var req_url = url.parse(req.url);
		var pathname = path.join('./', req_url.pathname);
		
		var rd = fs.createReadStream(pathname);
		rd.on('error', err => console.log(err));
		rd.pipe(res);
		res.setHeader('X-Foo', 'bar');
		res.writeHead(200, {'Content-Type': 'text/html'})
}).listen(80);


// const server = http.createServer((req, res) => {
//   const ip = res.socket.remoteAddress;
//   const port = res.socket.remotePort;
//   res.end(`你的IP地址是 ${ip}，你的源端口是 ${port}。`);
// }).listen(3000);