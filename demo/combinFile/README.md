# 通过服务器合并css或js文件
示例参考[7-days-nodejs](http://nqdeng.github.io/7-days-nodejs/#7.1);
# 启动
1. 在combinFile目录下运行命令(windows下) `node .\lib\daemon.js`;
2. 浏览器输入http://localhost/test??demo1.css,demo2.css;
3. 预览浏览器输出combinFile 目录下 的 `demo1.css`, `demo2.css`;

# 配置
1. 相关配置在config/index.json;可设置合并根目录，文件类型。
