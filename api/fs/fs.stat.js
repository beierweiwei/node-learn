var fs = require('fs');

fs.open('./README.md', 'r', function(err, fd) {
	if(err) throw err;
	var buf = new Buffer(20); 
	fs.read(fd, buf, 0, 20, null, function(err,bytesRead, buffer){ 
	 if(err){ 
	  console.log(err); 
	  return; 
	 } 
	 console.log('bytesRead' +bytesRead); 
	 console.log(buffer.toString()); 
	});
})