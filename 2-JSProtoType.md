# 三. JS原型与继承
函数的 `prototype` 是一个对象，也就是原型
- ## 原型链
对象的属性不仅仅是它本身拥有的属性，它还会从其他对象中继承一些属性。

当js在一个对象中找不到需要的属性时,它就会利用自身的`__proto__`属性到父对象上去找，以此类推，这就构成了对象的原型链。
> 通过`hasOwnProperty()`在对象及其原型链上查找属性。有则返回true

1. 每个函数都有 `prototype `（显式）属性，除了 `Function.prototype.bind()`，该属性指向原型。
2. 每个对象都有` __proto__` （隐式）属性，指向了创建该对象的构造函数的原型对象，并继承原型对象的所有属性
```javascript
  function Foo(x){
    this.name=x;
  }
  var f1 = new Foo(2018); // f1为对象， Foo为f1的构造函数
```
![proto_console](./js_png/proto_console.png)

- ## 原生对象的继承关系

![sd](./js_png/js_prototype.png)

### 1. Foo的原型：函数Foo的构造函数是`function Function()`，Function()的prototype指向了一个对象`Function.prototype`，故函数Foo的原型指向Function.prototype。

### 2. 对象Function.prototype的原型：对象`Function.prototype`的构造函数是`function Object()`,`function Object()`的prototype指针指向`Object.prototype`,即Function.prototype的原型为Object.prototype(该对象定义了所有对象共有的属性，比如hasOwnProperty()和toString()等。)

### 3. Object.prototype就是原型链的终点了，它的__proto__是null，js查找属性时，如果到这里还没有找到，那就是undefined了。

### 4. Function.proto === Function.prototype
> 这并不意味着Fuction自己产生了自己
- 所有对象通过原型链最终找到 Object.prototype ，而Object.prototype则是由引擎自己创建的。意味着`所有实例都是对象，但是对象不一定都是实例。`
- 一般而言，函数通过 new Function() 生成的，而Function是由引擎自己创建的。首先引擎创建了 Object.prototype ，然后创建了 Function.prototype ，并且通过` __proto__ `将两者联系了起来。

# 四. new操作符
对于实例对象来说，都是通过 new 产生的，无论是 function Foo( ) 还是 let a = { b : 1 } 。
- 过程
```javascript
  function Animal(name){
    this.name = name;
  }
  var cat = new Animla('cat');
  // 1. 创建一个空对象obj
  // 2. 建立obj的原型链：obj->Animal.prototype->Object.prototype->null
  // 3. 绑定 this，执行构造函数：let result = Animal.apply(obj, arguments)
  // 4. 确保返回一个新对象：return typeof result === 'object' ? result : obj
```
- new的优先级

### 优先级: `new Foo()` > `new Foo`
![new](./js_png/new.png)
```javascript
  new Foo.getName();   // -> new (Foo.getName());   
  new Foo().getName(); // -> (new Foo()).getName();
```

# 五. this的指向
## `[this是在函数执行时被绑定的，它始终指向调用当前函数的那个对象]`
## 调用函数有四种形式：
### 1.作为方法被调用
函数作为对象的属性时称为方法。

函数作为方法被调用时，this指向保存这个方法的对象。
```javascript
      var name = "window";
      var obj_0 = {
          name: "goozyshi",
          sayName: function() {  // 方法  
              console.log(this.name);
          }
      };
      obj_0.sayName();  //  goozyshi

      var f = obj_0.sayName;
      // 这里的sayNamme作为函数f被调用
      f();//  window
```
### 2. 作为全局函数被调用
this被绑定为全局对象，即`window`对象。
```javascript
      var name = "window";
      function sayName() {
          console.log(this.name);
      }
      sayName();
```
### 3. 作为构造函数被调用
使用`new`时，函数的this会被绑定到其实例对象上。
```javascript
  function Obj_1() {
          this.name = "goozyshi";
      }
      var person = new Obj_1(); // this绑定到person 
      console.log(person.name); // goozyshi
```
### 4. 被apply/call调用
`apply`和`call`都可以将`this`重新绑定到特定对象中。

唯一区别是apply接受的是数组参数，call接受的是连续参数。
```javascript
      var name = "window";
      var person = {
          name: "goozyshi"
      };
      var ace = {
          name: "ace"
      };
      function sayName() {
          console.log(this.name);
      }
      sayName(); //window
      sayName.apply(person); // goozyshi
```
# 六. 执行上下文
`执行上下文（Execution Context）`是保存着函数执行所需的重要信息的对象

当执行js代码时，会产生3种执行上下文
- 全局执行上下文
- 函数执行上下文
- eval 执行上下文

执行上下文有三个属性：
  - 变量对象(variable object)
  - 作用域链(scope chain)
  - this指针(this value)

### 1.执行顺序
每次开始执行一个函数之前，js都要创建一个上下文对象，并将其压入上下文栈中。

正在执行的函数的上下文总是在栈顶，这个函数一执行完，上下文就会从栈中弹出。
```javascript
function fun2() {
    var b = 222;
}
function fun1() {
    var a = 111;
    fun2();
}
fun1();
c = 333;
```
1. 开始执行时：
栈顶：全局上下文
2. 代码执行到`fun1()`;时，压入fun1的上下文。这时栈变成：
栈顶：fun1上下文 / 全局上下文
3. 代码执行到`fun2()`;时，压入fun2的上下文。这时栈变成：
栈顶：fun2上下文 / fun1上下文 / 全局上下文
4. fun2执行完毕，fun2上下文弹出：
栈顶：fun1上下文 / 全局上下文
(这时执行权回到fun1内，栈顶也恰好回到了fun1上下文。可见这种机制能保证正在执行的函数的上下文总是在栈顶)
5. fun1执行完毕，fun1上下文弹出，执行权回到全局区域：
栈顶：全局上下文
6. 所有代码都执行完毕，全局上下文弹出，栈为空。
### 2. 执行过程
>函数还未开始执行（创建上下文的期间）时叫变量对象(VO)，函数开始执行以后就叫活动对象(AO)。
- 第一个阶段（创建阶段——`创建变量对象VO`）
 
  JS 解释器找出需要提升的变量和函数，并且给他们提前在内存中开辟好空间

  函数的话会将整个`函数存入内存`中

  `变量只声明并赋值为 undefined`(ES6中的let只声明不赋值)
  

- 第二个阶段（代码执行阶段）

  此时可以直接使用声明了的变量、函数。
```javascript
function fun1(var arg) {
    // 第一阶段
    // 创建变量对象：{arg:987, fun2:fun2的地址, a:undefinded}
    console.log(a);  // 打印undefinded，因为活动对象中有键值对：a:undefinded。
    var a = 111;      // 如果将这一语句删除，上一句会直接报错！
    console.log(a);  // 打印111，因为活动对象中有键值对：a:111
    fun2();          // 打印in fun2! 因为活动对象中有键值对：fun2：某个内存地址
    return;          // 即使是在return之后的声明，也会被放入变量对象！
    function fun2() {
        console.log('in fun2!');
    }
}
fun1(987);
// 输出为：
// undefined
// 111
// in fun2!

```
### 3.立即执行函数与匿名函数

```javascript
  // 1.具名函数
  function xxx(){ // 函数声明(声明一个有名字的函数)
      console.log("functionName is xxx"); // functionName is xxx
  }
  xxx() // 执行该函数

  // 2.匿名函数
  function(){ // 报错，声明后无法被执行（因为不知道叫啥）
    console.log("do not have a functionName");
  }
  // 解决方法： 让其立即执行
  ( function(){
    console.log("do not have a functionName");// do not have a functionName
    }
  )();

