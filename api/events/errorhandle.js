const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
const myEmitter = new MyEmitter();
myEmitter.emit('error', new Error('whoops!'));
//抛出错误，并使Node.js崩溃

process.on('uncaughtException', (err) => {
	console.error('有错误')
});

