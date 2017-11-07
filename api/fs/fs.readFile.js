/*
fs.readFile(path[, options], callback)#

版本历史
path <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
options <Object> | <string>
encoding <string> | <null> 默认为 null。
flag <string> 默认为 'r'。
callback <Function>
err <Error>
data <string> | <Buffer>
 */
//如果未指定字符编码，则返回原始的 buffer。
var fs = require('fs');

fs.readFile('../../source/demo/file/file1.txt', (err, data) =>{
	if(err) throw err;
	console.log(data);
})

fs.readFile('../../source/demo/file/file1.txt', 'utf8', (err, data) =>{
	if(err) throw err;
	console.log(data);
})