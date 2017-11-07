//小文件拷贝

var fs = require('fs');

function copy(src, dist) {
	fs.writeFileSync(dist, fs.readFileSync(src))
}

function main(argv) {
	copy(argv[0], argv[1]);
}

main(process.argv.slice(2))

var fs = require('fs');
function copyFile(src, dist) {
	fs.writeFileSync(dist, fs.readFileSync(src))
}


//大文件拷贝
//
var fs = require('fs');

function copyLarge(src, dist) {
  var rd = fs.createReadstream(src); 
  var wt = fs.createWritestream(dist);
  fd.on('data', function(err, chunk) {
  	if(err) throw err;
  	wt.
  })
}
