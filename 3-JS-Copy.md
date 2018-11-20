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

# 十. 继承（简）
- 对象冒充
- 原型链

    先创建父类实例 => 改变实例原先的` _proto__ `转而连接到子类的 prototype => 子类的 prototype 的 `__proto__ `改为父类的 prototype

- 混合模式

# XI.异步
## 1. Promise
处理异步，解决回调地狱

可以把 Promise 看成一个状态机：

初始状态是 `pending`  ( 仅`pending`状态可改变且只可变一次 )

通过 `resolve `和` reject `函数，

将状态转变为` resolved `或者 `rejected` 状态

`then`函数会返回一个新的`Promise 实例`，如果返回的是一个相同实例的话，多个 then 调用就失去意义了。

## 2. Generator
 `*` 表示这是一个 Generator 函数,返回一个含有`next`方法的对象

` yield` 暂停代码

 `next` 恢复执行被暂停的代码
```javascript

function* test() {
  let a = 1 + 2;
  yield 2;
  yield 3;
}
let b = test();
console.log(b.next()); // >  { value: 2, done: false }
console.log(b.next()); // >  { value: 3, done: false }
console.log(b.next()); // >  { value: undefined, done: true }
```
## 3. async 和 await
`async` 使函数返回值使用 Promise.resolve() 包裹

`await` 只能在 `async `函数中使用,且会等待函数` resolve`,阻塞之后的代码（即使是同步）

很好的处理` then `的调用链，能够更清晰准确的写出代码
```javascript
function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('finish')
      resolve("sleep");
    }, 2000);
  });
}
async function test() {
  let value = await sleep();
  console.log("object");
}
test()
// finish
// object
```
# XII. 正则表达式
## 1. 元字符
| 元字符 | 作用 |
| :------: | :------: |
| `.` | 匹配任意字符除了换行符和回车符 |
| `[]` | 匹配方括号内的任意字符。比如 [0-9] 就可以用来匹配任意数字 |
| `^` | ^9，这样使用代表匹配以 9 开头。[^9]，这样使用代表不匹配方括号内除了 9 的字符 |
|`{2, 4}`|匹配 2 到 4 位字符|
|`(goozyshi)`|只匹配goozyshi|
|`|`|匹配 `|` 前后的字符或者表达式|
|`\`|转义|
|`*`|匹配`*`之前的字符或者表达式0次以上|
|`+`|匹配`+`之前的字符或者表达式1次以上|
|`?`|匹配`?`之前的字符或者表达式0次或者1次|

## 2. 修饰语
|修饰语|作用|
|:---:|:---:|
|`i`|忽略大小写|
|`g`|全局|
|`m`|多行|

## 3. 字符简写
|简写|作用|
|:---:|:---:|
|`\w`|匹配字母数字或下划线|
|`\W`|与上面相反|
|`\s`|匹配任意的空白符|
|`\S`|与上面相反|
|`\d`|匹配数字|
|`D`|与上面相反|
|`\b`|匹配单词的开始或结束|
|`\B`|与上面相反|
