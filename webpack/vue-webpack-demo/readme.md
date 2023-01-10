> 完整说明文档详见：https://blog.csdn.net/baidu_33591715/article/details/114078578

## 项目准备

```js
mkdir webpack-vue-demo // 创建一个新的文件夹
cd webpack-vue-demo
yarn init --yes // 初始化 package.json
yarn add webpack webpack-cli --dev  // 引入webpack
touch webpack.config.js // 创建webpack 配置文件
code . // 打开当前目录
```

## 项目基本配置

> 安装必要依赖
>
> - vue: `yarn add vue`
> - vue 插件: `yarn add vue-loader vue-template-compiler --dev`
> - css 插件: `yarn add css-loader style-loader vue-style-loader less-loader --dev`
> - image 插件: `yarn add file-loader url-loader --dev`
> - babel 插件: `yarn add @babel/core @babel/cli @babel/preset-env babel-loader --dev` `yarn add @babel/polyfill`
> - html 生成插件: `yarn add html-webpack-plugin --dev`
> - webpack 本地服务插件: `yarn add webpack-dev-server --dev`

**1. webpack 基本配置**
webpack.config.js

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

package.json

```json
{
  "name": "webpack-vue-demo",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "webpack": "^5.24.2",
    "webpack-cli": "^4.5.0"
  }
}
```

**2. 资源文件处理**
测试文件添加

- 添加 html 文件`public\index.html`
  `html <!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8" /> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <meta name="viewport" content="width=device-width,initial-scale=1.0" /> </head> <body> <noscript> <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong> </noscript> <div id="app"></div> <!-- built files will be auto injected --> </body> </html>`
- 添加图标`public\favicon.ico`

webpack.config.js

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html', // 模板地址
      filename: 'index.html',
      title: 'vue demo', // title
      favicon: 'public/favicon.ico', // 图标
    }),
  ],
};
```

**3. 热部署**
webpack.config.js

```js
module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // html所在路径
    compress: true, // 是否压缩
    port: 3000, // 端口
    hot: true, // 热部署
    open: true, // 打包完成后自动打开网页
  },
};
```

package.json

```json
 "scripts": {
    "build": "webpack",
    "serve": "webpack serve --config webpack.config.js"
  },
```

**4. vue 配置**
webpack.config.js

```js
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
```

测试文件添加

- `src/App.vue`
  `js <template> <div class="example"> {{ msg }} </div> </template> <script> export default { data() { return { msg: 'Hello Webpack', }; }, }; </script> <style> .example { color: red; } </style>`
- `src/main.js`
  `javascript import Vue from 'vue'; import App from './App.vue'; new Vue({ el: '#app', render: (h) => h(App), });`
  **5.图片资源加载**
  webpack.config.js

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.(png|jpe?j|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024, // 10 KB
          },
        },
      },
    ],
  },
};
```

测试文件添加

- `src\assets\logo.png`
- `src\App.vue`


    ```javascript
    <template>
      <div class="example">
        {{ msg }}
        <img :src="url" />
      </div>
    </template>
    
    <script>
    import logo from './assets/logo.png';
    
    export default {
      data() {
        return {
          msg: 'Hello Vue1',
          url: logo,
        };
      },
    };
    </script>
    
    <style>
    .example {
      color: red;
    }
    </style>
    ```

**6. babel**
webpack.config.js

```js
module.exports = {
	entry: ["@babel/polyfill", "./src/main.js"],
	module: {
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
	}
}
```

```js
touch.babelrc;
```

.babelrc

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ]
}
```

测试文件添加 `src\App.vue`

```js
<template>
  <div class="example">
    {{ msg }}
    <img :src="url" />
  </div>
</template>

<script>
import logo from './assets/logo.png';

export default {
  data() {
    return {
      msg: 'Hello Vue1',
      url: logo,
    };
  },
  methods: {
    fetchData() {
      const that = this
      new Promise((resovle) => {
        resovle('ok')
      }).then(res => {
        console.log(res)
        that.msg = res
      })
    }
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
.example {
  color: red;
}
</style>
```

**7. 设置 src 别名以及省略后缀**
webpack.config.js

```javascript
resolve: {
    extensions: [".vue", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
```

测试文件添加 `src\main.js`

```javascript
// App.vue 引入
import App from '@/App.vue';
```

