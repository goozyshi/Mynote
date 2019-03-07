## gm
- ## react native 如何与原生混合开发
  - 新建Android项目
  - 在项目根目录引入React-Native模块

    2.1 安装模块
    ```js
    npm init// 2.1 初始化package.json
    npm install --save react react-native// 2.2 安装react, react native 模块
    npm i -S react@version// 2.2.1 @后指定特定的版本号
    ```
    2.2 packgage.json内引用
    ```json
    "start": "node node_modules/react-native/local-cli/cli.js start"
    ```
    -  Native部分的配置
    3.1 gradle添加依赖
    ```js
    implementation 'com.facebook.react:react-native:+'
    ```
    3.2 声明网络权限
    ```js
    <uses-permission android:name="android.permission.INTERNET"/> // AndroidManifest.xml文件
    ```
    3.3 在原生项目内创建一个容器类，存放rn部分的代码

    3.4 在清单文件里面声明此Activity
    ```js
    <activity android:name=".MyRNActivity"
            android:label="@string/app_name"
            android:theme="@style/Theme.AppCompat.Light.NoActionBar"/>
    ```
    3.5 配置调试的界面
    ```java
    <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
    ```
    3.6 配置Application,继承RN的Application
    ```js
    public class App extends Application implements ReactApplication
    ```
- ## 讲一下redux
1. Redux 是JavaScript状态容器， 提供可预测化(固定输入=>固定输出)的状态管理。
2. 特点
    - 单一数据源

      所有的state都存储在一个单一的数据源store内部
    - state是只读的

      能改变state的唯一方式是通过触发action来修改
    - 使用纯函数执行修改

      reducers是一些`纯函数`(一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用)，接口当前state和action。只需要根据action，返回对应的state。

    ### [redux原来如此简单](https://segmentfault.com/a/1190000016311891)
- ## Vue的双向绑定是怎么实现的？
    ### [vue的双向绑定原理及实现](http://www.cnblogs.com/libin-1/p/6893712.html)
- ## vue和react有什么区别
- ## 什么是深拷贝？ 如何实现深拷贝
- ## 讲一下HTTP的缓存机制 / cache是怎么实现的？
- ## 讲一下跨域？
- ## HTTP状态码/304和302有什么区别
- ## 实习项目用到了什么框架？webpack如何拆分/打包
- ## 如何阻止事件冒泡

```js
//停止事件冒泡
window.event? window.event.cancelBubble=true: e.stopPropagation(); // ie/w3c
// 阻止浏览器的默认行为
window.event? window.event.returnValue=false: e.preventDefault();// ie/w3c
```
- ## event loop
- ## 讲一下TCP协议
- ## CSS盒子模型(IE盒子之类)
  - w3c盒子 = content(`width, height`) + padding + border + margin

  - ie盒子 = (content + padding + border)(`width ,height`) + margin

- ## 讲一下HTTP和HTTPS / SSL怎么实现的
- ## js是单线程的，如何实现异步编程
- ## H5和网页端有什么不同，需要注意什么？按钮触发？
- ## 使用哪些模型（如,Flexbox）去进行布局
