var fs = require('fs');
function coypBifFile(src, dist) {
	var rd = fs.createReadStream(src);
  var wt = fs.createWriteStream(dist);
  rd.on('data', function(chunk) {
  	if(!wt.write(chunk)) {
      rd.pause();
  	}
  });
  wt.on('drain', () => {
  	rd.resume();
  })
  rd.on('end', () => {
  	console.log('write end');
  	wt.end('、、、、、、、、、end')
  })

  rd.on('error', err => {
  	throw err;
  })
}
coypBifFile('./READEME.md', 'haha.md')


