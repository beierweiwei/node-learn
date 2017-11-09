var cp = require('child_process');
var fs = require('fs');
var work;
function spawn(server, config) {
	worker = cp.spawn('node', [server]);
	worker.stderr.on('data', (data) => {
	  console.log(`stderr: ${data}`);
	});
	worker.stdout.on('data', (data) => console.log(`stdout: ${data}`));
	worker.on('exit', (code) => {
		if(code !== 0) {
			console.log(code);
			spawn(server, config);
		}
	});
}

function main(argv) {
	spawn('./lib/server.js', argv[0]);
	process.on('SIGTERM', () => {
		work.kill();
		process.exit()
	})
}
console.log('daemon have run')
main(process.argv.slice(2));