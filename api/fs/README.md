#fs(文件系统)
文件 I/O 是对标准 POSIX 函数的简单封装。 通过 require('fs') 使用该模块。 所有的方法都有异步和同步的形式。

异步方法的最后一个参数都是一个回调函数。 传给回调函数的参数取决于具体方法，但回调函数的第一个参数都会保留给异常。 如果操作成功完成，则第一个参数会是 null 或 undefined。

异步方法
```javascript 
    const fs  = require('fs');
    fs.unlink('/tmp/hello', (err) => {
        if(err) throw err;
        console.log('成功删除/tmp/hello')    
    })
```

同步方法
```javascript 
    const fs = require('fs');
    fs.unlinkSync('tmp/hello');
    console.log('成功删除/tmp/hello')
```

在繁忙的进程中，建议使用异步的方法。同步的方法会阻塞整个进程，直到完成（停止所有连接）。

可以使用文件名的相对路径。 路径是相对 process.cwd() 的。

注意：在 Windows 上 Node.js 遵循单驱动器工作目录的理念。 当使用驱动器路径且不带反斜杠时就能体验到该特征。 例如，fs.readdirSync('c:\\') 可能返回与 fs.readdirSync('c:') 不同的结果。 详见 [MSDN 路径文档](https://msdn.microsoft.com/en-us/library/windows/desktop/aa365247.aspx#fully_qualified_vs._relative_paths)。

##常用api

文件属性读写。

其中常用的有fs.stat、fs.chmod、fs.chown等等。

文件内容读写。

其中常用的有fs.readFile、fs.readdir、fs.writeFile、fs.mkdir等等。

底层文件操作。

其中常用的有fs.open、fs.read、fs.write、fs.close等等。

##fs.writeFile(file, data[, options], callback)
* file <string> | <Buffer> | <integer> 文件名或文件描述符
* data <string> | <Buffer> | <Uint8Array>
* options <Object> | <string>
  * encoding <string> | <null> 默认 = 'utf8'
  * mode <integer> 默认 = 0o666
  * flag <string> 默认 = 'w'
  * callback <Function>
  * err <Error>

异步地写入数据到文件，如果文件已经存在，则替代文件。 data 可以是一个字符串或一个 buffer。

如果 data 是一个 buffer，则忽略 encoding 选项。它默认为 'utf8'。

```javascript
  fs.writeFile('message.txt', 'hello Node js', function(err) {
    if(err) throw err;
    console.log('the file has been saved');
  })
```

如果 options 是一个字符串，则它指定了字符编码。例如：
```javascript
  fs.writeFile('message.txt', 'hello Node js', 'uft8', callback)
```
