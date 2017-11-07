#stream(流)
流（stream）在 Node.js 中是处理流数据的抽象接口（abstract interface）。 stream 模块提供了基础的 API 。使用这些 API 可以很容易地来构建实现流接口的对象。
流可以是可读的、可写的，或是可读写的。所有的流都是 EventEmitter 的实例。

## 阅读
[nodejs -- stream](http://www.cnblogs.com/copperhaze/p/6163544.html)
[stream-handbook](https://github.com/beierweiwei/stream-handbook)

##两种模式
*flowing:*可读流自动从系统底层读取数据，并通过eventEmitter接口的事件尽快将数据提供给应用。
```javascript 
Readable.pipe(writable);
Readable.on('data', function(err, chunk) {
    //...
}) 
Readable.on('err', function(err) {
    //...
})
Readable.on('end', function(err) {
    //...
})
```
*paused:* 必须显示调用stream.read()方法从流中读取数据片段。

```javascript 
  var ok = Readable.read();
```

所有初始的工作模式为paused的Readable流，可以通过下面三种途径切换到flowing模式：
* 监听`data`时间。
* 调用`stream.resume()`方法从流中读取数据片段。
* 调用`stream.pipe()`方法将数据发送到Writable。

可读流可以通过下面途径切换到 paused 模式：
* 如果不存在管道目标（pipe destination）,可以通过调用`stream.pause()`方法实现。
* 如果存在管道目标，可以铜多取消`data`事件监听，并调用`stream.unpipe()`方法移除所有管道目标实现。

*这里需要记住的重要概念就是，可读流需要先为其提供消费或忽略数据的机制，才能开始提供数据。如果消费机制被禁用或取消，可读流将 尝试 停止生成数据。* 


##readable.read([size])
readable.read()方法从内部缓冲区中抽出并返回一些数据。 如果没有可读的数据，返回null。readable.read()方法默认数据将作为“Buffer”对象返回 ，除非已经使用readable.setEncoding()方法设置编码或流运行在对象模式。

##readable.pipe(destionation[, options])
readable.pipe() 绑定一个 Writable 到 readable 上， 将可写流自动切换到 flowing 模式并将所有数据传给绑定的 Writable。数据流将被自动管理。这样，即使是可读流较快，目标可写流也不会超负荷（overwhelmed）。

下面例子将 readable 中的所有数据通过管道传递给名为 file.txt 的文件：
##writable类
writable.write(chunk, [encoding][, callback])
writable.write()方法向流中写如数据，并在数据处理完成后调用callback。如果错误发生，callback不一定以这个错误作为第一个参数并被调用，要确保可靠地检测到写入错误，应监听`error`事件。