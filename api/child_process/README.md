#child_process (子进程)
child_process 模块提供了衍生子进程的功能，它与 popen(3) 类似，但不完全相同。 这个功能主要由 child_process.spawn() 函数提供

```javscript
    const { spawn } = require('child_process');
    const ls = spawn('ls', ['-lh', '/usr']);

    ls.stdout.on('data', (data) => {
      console.log(`输出：${data}`);
    });

    ls.stderr.on('data', (data) => {
      console.log(`错误：${data}`);
    });

    ls.on('close', (code) => {
      console.log(`子进程退出码：${code}`);
    });
```

*默认情况下，在 Node.js 的父进程与衍生的子进程之间会建立 stdin、stdout 和 stderr 的管道。*  数据能以非阻塞的方式在管道中流通。 

注意，有些程序会在内部使用行缓冲 I/O。 虽然这并不影响 Node.js，但这意味着发送到子过程的数据可能无法被立即使用。

##创建异步进程
child_process.spawn()、child_process.fork()、child_process.exec() 和 child_process.execFile() 方法都遵循与其他 Node.js API 一样的惯用的异步编程模式。

每个方法都返回一个 ChildProcess 实例。 这些对象实现了 Node.js EventEmitter 的 API，允许父进程注册监听器函数，在子进程生命周期期间，当特定的事件发生时会调用这些函数。

##在 Windows 上衍生 .bat 和 .cmd 文件
```javscript
// 仅限 Windows 系统
    const { spawn } = require('child_process');
    const bat = spawn('cmd.exe', ['/c', 'my.bat']);

    bat.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    bat.stderr.on('data', (data) => {
      console.log(data.toString());
    });

    bat.on('exit', (code) => {
      console.log(`子进程退出码：${code}`);
    });
```

```javscript
    // 或
    const { exec } = require('child_process');
    exec('my.bat', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });

    // 文件名带有空格的脚本：
    const bat = spawn('"my script.cmd"', ['a', 'b'], { shell: true });
    // 或：
    exec('"my script.cmd" a b', (err, stdout, stderr) => {
      // ...
    });
```

##child_process.exec() 和 child_process.execFile() 
之间的重大区别会根据平台的不同而不同。 在类 Unix 操作系统上（Unix、 Linux、 macOS），child_process.execFile() 效率更高，因为它不需要衍生一个 shell。 但是在 Windows 上，.bat 和 .cmd 文件在没有终端的情况下是不可执行的，因此不能使用 child_process.execFile() 启动。 当在 Windows 下运行时，要调用 .bat 和 .cmd 文件，可以通过使用设置了 shell 选项的 child_process.spawn()、或使用 child_process.exec()、或衍生 cmd.exe 并将 .bat 或 .cmd 文件作为一个参数传入（也就是 shell 选项和 child_process.exec() 所做的工作）。 在任何情况下，如果脚本文件名包含了空格，则需要用加上引号。

##child_process.exec(command[, options][, callback])
衍生一个 shell，然后在 shell 中执行 command，且缓冲任何产生的输出。传入 exec 函数的 command 字符串会被 shell 直接处理，特殊字符（因 shell 而异）需要相应处理：
```
// 使用双引号这样路径中的空格就不会被解释为多个参数
exec('"/path/to/test file/test.sh" arg1 arg2');

// 第一个 $HOME 被转义了，但第二个没有
exec('echo "The \\$HOME variable is $HOME"');

```

##child_process.fork(modulePath[, args][, options])
 * modulePath <string> 要在子进程中运行的模块。

##child_process.spawn(command[, args][, options])
 * command <string> 要运行的命令。
