const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter1 = new MyEmitter();
myEmitter1.on('event', ()=> {
	console.log('触发了一个事件');
})

myEmitter1.emit('event');

//给监听器传入参数与 this
//当一个普通的监听器函数被 EventEmitter 调用时，标准的 this 关键词会被设置指向监听器所附加的 EventEmitter。

const myEmitter2 = new MyEmitter();
myEmitter2.on('event', function(a, b) {
	console.log(a, b, this);
})
myEmitter2.emit('event', 'a', 'b');
//print
/*	
a b MyEmitter {
  domain: null,
  _events: { event: [Function] },
  _eventsCount: 1,
  _maxListeners: undefined }
 */