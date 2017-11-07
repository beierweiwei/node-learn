//异步遍历
//在回调中使用递归控制变量节奏，传递finish回调回到上次遍历的节点。

var fs = require('fs');
var path = require('path');

function travelAsync(dir, callback, finish) {
	fs.readdir(dir, function(err, files) {
		if(err) throw err;
		// files.forEach(file => {
		// 	var pathname = path.join(dir, file);
		// 	fs.stat(pathname, (err, stats) => {
		// 		if(err) throw err;
		// 		if(stats.isDirectory()) {
		// 			travelAsync(pathname, callback)
		// 		}else {
		// 			callback(pathname);
		// 		}
		// 	})
		// })
		(function next(i) {
			if(i < files.length) {
				var pathname = path.join(dir, files[i]);

				fs.stat(pathname, (err, stats) => {
					if(err) throw err;
					if(stats.isDirectory()) {

						travelAsync(pathname, callback, () => {
							next( i + 1);
						});
					}else {
						callback(path);
					}
				})
			}else {
				finish && finish();
			}
			
		})(0)
	})
}

travelAsync('../../../fis3-mod-seed-master', (file) => { console.log(file)})