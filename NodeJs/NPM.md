## [npm scripts](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
### 一、什么是 npm 脚本？
npm 允许在`package.json`文件里面，使用scripts字段定义脚本命令。
```
// package.json 文件
{
  ...
  "scripts": {
    "build": "node build.js"
  }
}
```
比如，build命令对应的脚本是node build.js。

命令行下使用npm run命令，就可以执行这段脚本。

```
$ npm run build
# 等同于执行
$ node build.js
```
这些定义在package.json里面的脚本，就称为 npm 脚本。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的npm run命令。
```
$ npm run
```
### 二、原理
npm 脚本的原理非常简单。每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，`npm run新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。`

### 三、通配符
```
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```
上面代码中，*表示任意文件名，**表示任意一层子目录。

### 四、传参
向 npm 脚本传入参数，要使用 -- 标明。

如 npm install 命令传入参数，必须写成下面这样。下面三个都是等效将依赖信息写入package.json 的 dependencies 字段。
```
$ npm install xxx --S
$ npm i xxx --save
$ npm i xxx --save-dev
```
### 五、执行顺序
- 并行执行（即同时的平行执行），可以使用&符号。

```
$ npm run script1.js & npm run script2.js
```
- 继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。

```
$ npm run script1.js && npm run script2.js
```
### ...
### 七、钩子
npm 脚本有pre和post两个钩子。举例来说，build脚本命令的钩子就是prebuild和postbuild。
```
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

用户执行npm run build的时候，会自动按照下面的顺序执行。
```
npm run prebuild && npm run build && npm run postbuild
```

因此，可以在这两个钩子里面，完成一些准备工作和清理工作。下面是一个例子。
```
"clean": "rimraf ./dist && mkdir dist",
"prebuild": "npm run clean",
"build": "cross-env NODE_ENV=production webpack"
```
### 十、常用脚本示例
```js

// 删除目录
"clean": "rimraf dist/*",

// 本地搭建一个 HTTP 服务
"serve": "http-server -p 9090 dist/",

// 打开浏览器
"open:dev": "opener http://localhost:9090",

// 实时刷新
 "livereload": "live-reload --port 9091 dist/",

// 构建 HTML 文件
"build:html": "jade index.jade > dist/index.html",

// 只要 CSS 文件有变动，就重新执行构建
"watch:css": "watch 'npm run build:css' assets/styles/",

// 只要 HTML 文件有变动，就重新执行构建
"watch:html": "watch 'npm run build:html' assets/html",

// 部署到 Amazon S3
"deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",

// 构建 favicon
"build:favicon": "node scripts/favicon.js",
```