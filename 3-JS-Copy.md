# 七. 闭包
函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。
```javascript
function A() {
    let a = 1
    function B() {
        console.log(a)  // a存储在堆上，故而不会因为调用栈的关系而被弹出 
        // JS 引擎通过逃逸分析辨别出哪些变量需要存储在堆上，哪些需要存储在栈上
    }
    return B
}
```
解决循环中异步`var`作用域问题：
```javascript
for ( var i=1; i<=5; i++) {
	setTimeout( function timer() {
		console.log( i );
	}, i*1000 );// setTimeout为异步函数，先执行了循环，最终输出全是6
}
```
1. 使用块级作用域`let`
```javascript
    for ( let i=1; i<=5; i++) {
        setTimeout( function timer() {
            console.log( i );
        }, i*1000 );
    }
```
2. 使用`setTimeout()`的第三个参数
```javascript
    for ( var i=1; i<=5; i++) {
        setTimeout( function timer(j) {
            console.log( j );
        }, i*1000, i);// setTimeout(func,delay,param1, param2,...)param作为func的参数
    }
```
3. 闭包
```javascript
    for ( var i=1; i<=5; i++) {
    (function(j){
			setTimeout( function timer() {
				console.log( j );
			}, j*1000 );
    })(i)
    }
```

# 八. 深浅拷贝
当两个对象来自同一引用时，一方改变会引起另一方跟着变化。
```javascript
let a = {
    age: 1
}
let b = a
a.age = 2
console.log(b.age) // 2
```
## 1. 浅拷贝
使用`...`拓展运算符或者`Object.assign`进行浅拷贝。
```javascript
let a = {
    age: 1,
    jobs: {
        first: 'FE'
    }
}
let b = {...a} 
a.age = 2,
console.log(b.age) // 1

// 浅拷贝只能解决了第一层的问题
a.jobs.first = 'native'
console.log(b.jobs.first) // native
```
## 2. 深拷贝
使用`JSON.parse(JSON.stringify(object))`进行深拷贝。
```javascript
	let b = JSON.parse(JSON.stringify(a));
```
但此方法有如下局限性：
- 会忽略`undefined`
- 无法序列化`函数`
- 无法解决循环引用的对象

## `[完美解决方式]`
 1. 数据含有以上三种情况：
```javascript
let b = _.cloneDeep(a);// loadsh的深拷贝函数
```
 2. 拷贝对象不包含函数：`MessageChannel`(1.异步方法 2.可处理 undefined 和循环引用对象)

 # 九. 防抖与节流
 防止用户抽风式狂点按钮或其他可以触发函数事件的组件
## 1. 防抖
将多次执行变为最后一次执行

设置一个定时器，给定一个延迟，如果在用户点击间隔小于给定的延迟时间，就清空上一个定时器，重新计时。
```javascript
// func是用户传入需要防抖的函数
// wait是等待时间
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = 0
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
// 不难看出如果用户调用该函数的间隔小于wait的情况下，上一次的时间还未到就被清除了，并不会执行函数
```
- 对于按钮防点击来说的实现：如果函数是立即执行的，就立即调用，如果函数是延迟执行的，就缓存上下文和参数，放到延迟函数中去执行。一旦我开始一个定时器，只要我定时器还在，你每次点击我都重新计时。一旦你点累了，定时器时间到，定时器重置为 null，就可以再次点击了。
- 对于延时执行函数来说的实现：清除定时器ID，如果是延迟调用就调用函数
## 2. 节流
将多次执行变成每隔一段时间执行