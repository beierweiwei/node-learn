### Buffer (缓冲)
在 ECMAScript 2015 (ES6) 引入 TypedArray 之前，JavaScript 语言没有读取或操作二进制数据流的机制。 Buffer 类被引入作为 Node.js API 的一部分，使其可以在 TCP 流或文件系统操作等场景中处理二进制数据流。

Buffer 类的实例类似于整数数组，但 Buffer 的大小是固定的、且在 V8 堆外分配物理内存。 Buffer 的大小在被创建时确定，且无法调整。

Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require('buffer').Buffer。


### 阅读：[nodejs -- Buffer](http://www.cnblogs.com/copperhaze/p/6232661.html)
[node的Buffer数据到底是几进制](https://segmentfault.com/q/1010000009002065?_ea=1797030)

##Buffer 类
###`new Buffer(array)`、`new Buffer(arrayBuffer[, byteOffset[,length]])`、`new Buffer(buffer)`、`new buffer(size)`、new buffer(string, [,encoding])、
废弃于: v6.0.0, 使用 buffer.from(buffer)替代
```javascript
//example: new Buffer(array)
// Creates a new Buffer containing the UTF-8 bytes of the string 'buffer'
const buf = new Buffer([0x62, 0x75, 0x66, 0x66, 0x65, 0x72])

//example: new Buffer(arrayBuffer[, length])
const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;

//shares memory with 'arr'
const buf = new Buffer(arr.buffer);

//prints: <Buffer 88 13 a0 0f>
console.log(buf);

//changing the original Uint16Array changes the Buffer also
arr[1] = 6000;

//prints: <buffer 88 13 70 17>
console.log(buf);

//example: new Buffer(buffer)
const buf1 = new Buffer('buffer');
const buf2 = new Buffer(buf1);

buf1[0] = 0x61;

//prints: auffer
console.log(buf1.toString());

//prints:buffer
console.log(buf2.toString());

```

###类方法：Buffer.alloc(size[, fill[, encoding ]])
新增: v5.10.0

```javascript
    const buf  = Buffer.alloc(5);

    //prints: <Buffer 00 00 00 00 00>
    console.log(buf);

    //specify fill
    const buf = Buffer.alloc(5, 'a');

    //prints: <Buffer 61 61 61 61 61>
    console.log(buf);
```

