注意：在 Windows 上 Node.js 遵循单驱动器工作目录的理念。 当使用驱动器路径且不带反斜杠时就能体验到该特征。 例如，fs.readdirSync('c:\\') 可能返回与 fs.readdirSync('c:') 不同的结果。 详见 [MSDN 路径文档](https://msdn.microsoft.com/en-us/library/windows/desktop/aa365247.aspx#fully_qualified_vs._relative_paths)。

NodeJS通过fs内置模块提供对文件的操作。fs模块提供的API基本上可以分为以下三类：

文件属性读写。

其中常用的有fs.stat、fs.chmod、fs.chown等等。

文件内容读写。

其中常用的有fs.readFile、fs.readdir、fs.writeFile、fs.mkdir等等。

底层文件操作。

其中常用的有fs.open、fs.read、fs.write、fs.close等等。