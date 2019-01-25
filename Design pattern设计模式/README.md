# 前端常用的设计模式

`设计模式`是软件开发人员在软件开发过程中面临的一般问题的解决方案。
## 1. 工厂模式 —— Factory
顾名思义，工厂模式就是像是工厂一样流水线般生产出一个个对象
## 核心
1. 返回一个对象
2. 创建不同的引用类型
## 案例
```javascript
function createJob(job){
  let person = {
    name: 'goozyshi',
    work: function() {
      console.log(job)
    }
  };
  return person; // 返回一个对象
}

/** 创建不同引用对象 */
let xiaoMing = createJob('主管');
let xiaoHong = createJob('员工');
```
## 2. 构造函数模式 —— Constructor
在Javascript里，我们对构造函数使用`new`来新增实例
## 核心
1. 将属性绑定到`this`上
2. 将方法绑定到`prototype`上
3. 使用`new`来新增实例,即创建不同的引用类型
## 案例
```javascript
function Product(name) {
    this.name = name; // 将属性绑定到this
};
Product.prototype.price = function () { // 将方法绑定到prototype
    console.log('price')
};
let Computer = new Product('电脑'); // 新建实例
```
## 3. 单例模式 —— Singleton
负责创建自己的对象，同时确保`只有单个对象`被创建
## 核心
1. 产生一个类的`唯一`实例
2. 好处就是`节约内存`
## 案例
```javascript
function createPeople() {
    let type;
    return function(userName) {// createPeople返回一个函数
        return type || (type = userName)
    }
};
let single = createPeople();
console.log(single('人')); // '人'
// 不管再传递任何值，也只会返回人
console.log(single('树')); // '人'
```
## 4. 模块模式 —— Module
目的是为了区分Javascript中的`公有变量`和`私有变量`
## 核心
1. [闭包](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)：简单理解为定义在一个函数内部的函数
- 闭包的优点：1. 读取函数内部的变量；2.使变量的值始终保持在内存中
- 闭包的缺点：1.使变量保存在内存中，内存消耗很大；2。闭包会在父函数外部，改变父函数内部变量的值
## 案例
```javascript
function addSelf(){
  let num = 0;
  showNum = function() { // 闭包
    console.log(num)
    num ++;
  }
  return showNum;
}
let result = addSelf();
result(); // 0
result(); // 1
```
## 5. 混合模式 —— Mixin
## 核心
1. 在JS中，一般我们`实现继承的过程`就是混合模式
2. 其概念就是`提供能够被一个或者一组子类简单继承功能的类`
## 案例
```javascript
var Fn = function(){
    this.a = 1;
    this.b = 2;
    this.init()
}
Fn.prototype.init = function(){
    console.log("ok")
};
/** 继承 */
var Son = function(){};
Son.prototype=Object.create(Fn.prototype);
Son.prototype.construct = Son
```

## 6. 发布订阅模式 —— Publish/Subscribe
定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新
## 核心
 比如小明和小红[订阅者】现在订阅了一个公众号，公众号【发布者】向他们发布消息
## 案例
```javascript
let EventCenter = (function () {
  let events = {};
  function on(evt, handler) {
    // 实现监听效果
    events[evt] = events[evt] || []// 使用'或'是为了可以对同一个事件多次进行回调
    events[evt].push({
        handler: handler
    })
    console.log(events[evt])
  };
  function fire(evt, args) {
    if (!events[evt]) { // 如果未监听任何事件，直接中断
        return;
    }
    for (let i = 0; i < events[evt].length; i++) {
        // 遍历，实现对同一个事件的多次回调
        events[evt][i].handler(args)
    }
  };
  function off(name) {
    delete events[name]
  };
  return {
    on: on, // 订阅者
    fire: fire, // 发布者
    off: off // 取消订阅
  }
})()

/** 两次订阅 */
EventCenter.on('hello', function (num) {
    console.log(num)
})
EventCenter.on('hello', function (num) {
    console.log(num)
})
/** 一次性发布两次 */
EventCenter.fire('hello', 1) // 1[出现两次]
```
## 7. 策略模式 —— Strategy
定义一系列的算法，把它们一个个封装起来，将不变的部分和变化的部分隔开，实际就是将算法的使用和实现分离出来。
## 核心
1. 策略类封装了具体的算法，并负责具体的计算过程。
2. 环境类Context接收客户端的请求，随后把请求委托给某一个策略类。
3. `适合存在大量验证的情景，可以大量减少if语句`
## 案例
```javascript
/**
  * 以公司年终奖为例： 
  * 绩效为A的人，年终奖为工资的4倍 
  * 绩效为B的人，年终奖为工资的3倍 
  * 绩效为C的人，年终奖为工资的2倍
  */

/** 传统方案 */
//   var calculateBouns = function(salary,level) {
//     if(level === 'A') {
//         return salary * 4;
//     }
//     if(level === 'B') {
//         return salary * 3;
//     }
//     if(level === 'C') {
//         return salary * 2;
//     }
// };
// // 调用如下：
// console.log(calculateBouns(4000,'A')); // 16000
// console.log(calculateBouns(2500,'B')); // 7500

/** 策略模式 */
var obj = {// 策略类
  "A": function(salary) {
      return salary * 4;
  },
  "B" : function(salary) {
      return salary * 3;
  },
  "C" : function(salary) {
      return salary * 2;
  } 
};
var calculateBouns =function(level,salary) {// 环境类
    return obj[level](salary);
};
console.log(calculateBouns('A',10000)); // 40000
```
## 参考
## 1.[前端常见设计模式汇总——掘金](https://juejin.im/post/5c0e6ab96fb9a049f43b26da)

## 2. [Javascript设计模式——Alloy Team](https://segmentfault.com/a/1190000009267658#articleHeader3)