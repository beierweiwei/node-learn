var fs = require('fs');
var path = require('path');


function travel (dir, callback) {
  fs.readdirSync(dir).forEach(file => {
  	var pathname = path.join(dir, file)
  	if(fs.statSync(pathname).isDirectory()) {
  		travel(pathname, callback)
  	}else {
  		callback(pathname);
  	}
  })
}
travel('../../source', (file) => { console.log(file)})