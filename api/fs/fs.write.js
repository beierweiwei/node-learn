var fs  = require('fs');

fs.write('../../source/demo/file/file1.txt', 'wirte this string to file1.txt', function(err, written, string) {
	if(err) throw err;
	console.log('wrtten', written, 'string', string);
})