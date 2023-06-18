# 出生过程

1. 创建文件夹
2. 执行命令创建 package.json `npm init -y`
3. 创建执行文件 bin/index.js `注意添加头`
4. 配置 bin `"cr-scaffold": "bin/index.js"`
5. 发布脚手架到 npm
   1. 登录 npm `npm login`
   2. 发布 `npm publish`

# 添加工具包调试

1. 在 scaffold-demo-utils 文件夹下执行 `npm link`
2. 回到当前文件夹下执行 `npm link scaffold-demo-utils`
3. 手动添加 dependencies
   ```json
   "dependencies": {
    "scaffold-demo-utils": "^1.0.0"
   }
   ```

# 发布上线

1. 发布 scaffold-demo-utils 包
2. 执行 `npm unlink` 解除全局绑定，如果遇到报错：删掉 node_modules 重新执行命令
3. 执行 `npm unlink scaffold-demo-utils`
4. 升级版本号
5. 执行 `npm publish` 发布

# 注意点【developer】

1. 脚手架在全局安装后如果指向了本地的代码仓库（指向原因：在当前目录下存在相关代码仓库，npm 就会将本地文件作为软链接直接链接过去-npm 方便开发者进行本地的开发和调试），如果本地仓库进行改变了，那么直接使用脚手架命令也会得到相应的更新
2. 如果不希望出现 1 的情况，只需要离开相关目录进行 npm 安装脚手架即可
