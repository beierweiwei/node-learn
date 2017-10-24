注意：在 Windows 上 Node.js 遵循单驱动器工作目录的理念。 当使用驱动器路径且不带反斜杠时就能体验到该特征。 例如，fs.readdirSync('c:\\') 可能返回与 fs.readdirSync('c:') 不同的结果。 详见 [MSDN 路径文档](https://msdn.microsoft.com/en-us/library/windows/desktop/aa365247.aspx#fully_qualified_vs._relative_paths)。