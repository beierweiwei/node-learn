var config = {
	root: './test',
	MIME: {
		'.js': 'application/javascript',
		'.css': 'text/css'
	}
}

var http = require('http');
var fs  = require('fs');
var path = require('path');
var url = require('url');
var cp = require('child_process');

function main(argv) {
	var config = argv[0] ? fs.readFileSync(argv[0]) : config;
	//create server
	http.createServer((req, res) => {
		//parse url
		if(req.url == '/favicon.ico') return res.end();
		var urlinfo = parseUrl(req.url);
		//validateFile
		validateFile(urlinfo.urls, (err, pathnames) => {
			if(err) {
				res.writeHead(404);
				res.end(err.message)
			}else {
				res.writeHead(200, {'Content-Type': urlinfo.mime});
				//combinfile
				combinFile(urlinfo.urls, res);
			}
		})
	}).listen(80)
	
}

function parseUrl(urls) {
	var urls = url.parse(urls).path.split('??');
	var base = urls[0];
	var combins = urls[1].split(',').map((file) => {
		return path.join(config.root, base, file);
	});
	return {
		urls: combins,
		mime: config.MIME[path.extname(combins[0])] || 'text/plain'
	}
}

function combinFile(urls, writer) {

	(function next(i, lenth) {
		if(i < lenth) {
			var rd = fs.createReadStream(urls[i]);
			rd.pipe(writer, {end: false});
			rd.on('end', () => {
				next(++i, lenth)
			})

		}else {
			writer.end();
		}
	})(0, urls.length)
}

function validateFile(urls, callbck) {
	(function next(i, len) {
		if(i < len) {
			fs.stat(urls[i], (err, stats) => {
				if(err) {
					callback(err)
				}else if (!stats.isFile()) {
					callback(new Error)
				}else {
					next(++i, len)
				}
			})
		}else {
			callbck(null, urls)
		}
	})(0, urls.length)
	
}

var work;
function spawn(server, config) {
	worker = cp.spawn('node', [server, config]);
	worker.on('exit', (code) => {
	if(code !== 0) {
		spawn(server, config);
	}
}

function main(argv) {
	spawn('./lib/server.js', argv[0]);
	process.on('SIGTERM', () => {
		work.kill();
		process.exit()
	})
}


main(process.argv.slice(2));