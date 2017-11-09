var http = require('http');
var fs  = require('fs');
var path = require('path');
var url = require('url');
function main(argv) {
	var config_file = argv[0] || './config/config.json';
	var config = JSON.parse(fs.readFileSync(config_file, 'utf8'));
	var rooturl = config.root || '.',
			port = config.port || 80,
			mime = config.MIME || {
				'.js': 'application/javascript',
				'.css': 'text/css'
			},
			server;
	//create server
	server = http.createServer((req, res) => {
		//parse url
		if(req.url == '/favicon.ico') return res.end();
		var urlinfo = parseUrl(req.url, rooturl, mime);
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
	}).listen(port);

	process.on('SIGTERM', function() {
		server.close(function() {
			process.exit(0);
		})	
	})
	
}

function parseUrl(urls, rooturl, mime) {
	var urls = url.parse(urls).path.split('??');
	var base = urls[0];
	var combin_url = urls[1] || '';
	var combins = combin_url.split(',').map((file) => {
		return path.join(rooturl, base, file);
	});
	return {
		urls: combins,
		mime: mime[path.extname(combins[0])] || 'text/plain'
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

function validateFile(urls, callback) {
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
			callback(null, urls)
		}
	})(0, urls.length)
}

console.log('server.js have run')
main(process.argv.slice(2));