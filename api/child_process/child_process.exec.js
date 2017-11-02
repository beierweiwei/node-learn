/*child_process.exec(command[, options][, callback])#
新增于: v0.1.90
command <string> 要运行的命令，用空格分隔参数。
options <Object>
cwd <string> 子进程的当前工作目录。
env <Object> 环境变量键值对。
encoding <string> 默认为 'utf8'。
shell <string> 用于执行命令的 shell。 在 UNIX 上默认为 '/bin/sh'，在 Windows 上默认为 process.env.ComSpec。 详见 Shell Requirements 与 Default Windows Shell。
timeout <number> 默认为 0。
maxBuffer <number> stdout 或 stderr 允许的最大字节数。 默认为 200*1024。 如果超过限制，则子进程会被终止。 查看警告： maxBuffer and Unicode。
killSignal <string> | <integer> 默认为 'SIGTERM'。
uid <number> 设置该进程的用户标识。（详见 setuid(2)）
gid <number> 设置该进程的组标识。（详见 setgid(2)）
callback <Function> 当进程终止时调用，并带上输出。
error <Error>
stdout <string> | <Buffer>
stderr <string> | <Buffer>
返回: <ChildProcess>
*/
const { exec } = require('child_process');
console.log(exec);
exec('dir', {encoding: 'utf-8'}, function(err, stdout, stderr) {
	if(err) {
		console.log(err.stack);
		console.log('Error code:' + error.code);
		console.log('Signal received' + error.signal);
	}
	console.log('data:' + stdout);
}).on('exit', function(code) {
	console.log('子进程已退出， 退出码' + code);
});