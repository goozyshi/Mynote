- # [总结](#总结)
## 一.基础语法
`$(selector).action()`
- 美元符号定义 jQuery
- 选择符（selector）"查询"和"查找" HTML 元素
- jQuery 的 action() 执行对元素的操作

`selector`
- 元素选择器： $('p')
- id选择器：$('#id')
- class选择器：$('p.class')
![](./img/selector.png)
## [jQuery 事件](http://www.runoob.com/jquery/jquery-events.html)
![](./img/jqevent.png)
## 二.效果
- 显示隐藏:

$(selector).`hide`(speed,callback)：隐藏

$(selector).`show`(speed,callback)：显示

$(selector).`toggle`(speed,callback)：隐藏/显示切换

`speed`: 规定隐藏/显示的速度（单位：ms）

`callback` : 隐藏或显示完成后所执行的函数名称。
- 淡入淡出

$(selector).`fadeIn`(speed,callback)：淡入(出现)

$(selector).`fadeOut`(speed,callback)：淡出（消失）

$(selector).`fadeToggle`(speed,callback)：淡入/淡出切换

$(selector).`fadeTo`(speed,opacity,callback)：允许渐变为指定不透明度

- 滑动

$(selector).`slideDown`(speed,callback)：向下滑动元素

$(selector).`slideUp`(speed,callback)：用于向上滑动元素

$(selector).`slideToggle`(speed,callback)：向上/向下切换

- 动画 && 停止动画

  - $(selector).`animate`({params},speed,callback)：创建自定义动画

    >多个动画逐一运行

    `params`：必需，定义形成动画的 CSS 属性。

    `speed`：可选，规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。

    `callback`：可选，动画完成后所执行的函数名称。

  - $(selector).`stop`(stopAll,goToEnd)：停止动画或效果

    `stopAll`: 可选，是否应该清除所有动画队列。默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。

    `goToEnd`：可选，是否立即完成当前动画。默认是 false。
## 三. DOM操作
### `1. 获取`
内容
  - `text(string,callback)` - 设置或返回所选元素的文本内容
  - `html(string,callback)` - 设置或返回所选元素的内容（包括 HTML 标记）
  - `val(string,callback)` - 设置或返回表单字段的值

获取属性
  - attr(key)
```js
$("button").click(function(){
  // 单个
  alert($("#runoob").attr("href", 'www.baidu.com'));
  // 多个
  $("#runoob").attr({
        "href" : "http://www.runoob.com/jquery",
        "title" : "jQuery 教程"
    });
  // 回调
  $("#runoob").attr("href", function(i,origValue){
    return origValue + "/jquery"; 
  });
});
```
### `2. 添加`
内部添加
- `append()` - 在被选元素的结尾插入内容
- `prepend()` - 在被选元素的开头插入内容

外部添加
- `after()` - 在被选元素之后插入内容
- `before()` - 在被选元素之前插入内容

### `3. 删除`
- `remove(param)` 删除被选元素及其子元素,可以接受一个参数进行过滤。
- `empty()` 清空子元素。
```js
 $("p").remove(".italic");// 删除 class="italic" 的所有 <p> 元素
``` 
### `4. CSS类`
- addClass() - 向被选元素添加一个或多个类
- removeClass() - 从被选元素删除一个或多个类
- toggleClass() - 对被选元素进行添加/删除类的切换操作
- `css()` - 设置或返回样式属性
```js
$("p").eq(N).css("background-color");// 返回第N-1个匹配元素的 background-color 值
$("p").css("background-color","yellow");// 为所有匹配元素设置 background-color 值
```
### `5. 尺寸`
- width()
- height()
- innerWidth()
- innerHeight()
- outerWidth()
- outerHeight()

![](./img/jquerydim.gif)

##  四. 遍历
从被选（当前的）元素开始，家族树中向上移动（祖先），向下移动（子孙），水平移动（同胞）。这种移动被称为对 DOM 进行遍历。

![](./img/travtree.png)

- \<div> 元素是 \<ul> 的父元素，同时是其中所有内容的`祖先`。
- \<ul> 元素是 \<li> 元素的`父元素`，同时是 \<div> 的子元素
- 左边的 \<li> 元素是 \<span> 的父元素，\<ul> 的子元素，同时是 \<div> 的`后代`。
- \<span> 元素是 \<li> 的子元素，同时是 \<ul> 和 \<div> 的后代。
- 两个 \<li> 元素是`同胞`（拥有相同的父元素）。
- 右边的 \<li> 元素是 \<b> 的父元素，\<ul> 的子元素，同时是 \<div> 的后代。
- \<b> 元素是右边的 \<li> 的`子元素`，同时是 \<ul> 和 \<div> 的后代。

### `1. 向上遍历`
- `parent()`  返回被选元素的直接父元素。
- `parents()` 返回被选元素的所有祖先元素，它一路向上直到文档的根元素 (\<html>)。
- `parentsUntil()` 返回介于两个给定元素之间的所有祖先元素。
```js
  $("span").parentsUntil("div");// 返回介于两个给定元素之间的所有祖先元素
```

### `2. 向下遍历`
- children() 返回被选元素的所有直接子元素
- find() 返回被选元素的后代元素，一路向下直到最后一个后代。

### `3. 水平遍历`
- `siblings()` 返回被选元素的所有同胞元素。
- `prev() / next()` 返回被选元素的前/后一个同胞元素
- `prevAll() / nextAll()` 返回被选元素的前/后所有同胞元素。
- `prevUntil() / nextUntil()` 返回介于两个给定参数之间的所有跟随的同胞元素。

### `4. 过滤`
- `first()` 返回被选元素的首个元素。
- `last()` 返回被选元素的最后一个元素。
- `eq()` 返回被选元素中带有指定索引号的元素。
- `filter()` 允许您规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。
- `not()` 返回不匹配标准的所有元素。
## 五. Ajax
- `$(selector).load(URL,data,callback)`：从服务器加载数据，并把返回的数据放入被选元素中。
    - 必需的 URL 参数规定您希望加载的 URL。

    - 可选的 data 参数规定与请求一同发送的查询字符串键/值对集合。

    - 可选的 callback 参数是 load() 方法完成后所执行的函数名称。
       -  responseTxt - 包含调用成功时的结果内容
      - statusTXT - 包含调用的状态
      - xhr - 包含 XMLHttpRequest 对象
- HTTP 请求
  - `$.get(URL,callback);` 通过 HTTP GET 请求从服务器上请求数据。
  - `$.post(URL,data,callback);` 通过 HTTP POST 请求向服务器提交数据。
    - 必需的 URL 参数规定您希望请求的 URL。

    - 可选的 data 参数规定连同请求发送的数据。

    - 可选的 callback 参数是请求成功后所执行的函数名。
    ```js
    $.post("/try/ajax/demo_test_post.php",
    {
        name:"菜鸟教程",
        url:"http://www.runoob.com"
    },
        function(data,status){
        alert("数据: \n" + data + "\n状态: " + status);
    });
    ```
## 总结
### 1.基本选择器
```js
$("#id")            //ID选择器
$("div")            //元素选择器
$(".classname")     //类选择器
$(".classname,.classname1,#id1")     //组合选择器
```
### 2.层次选择器
```js 
$("#id>.classname ")    //子元素选择器
$("#id .classname ")    //后代元素选择器
$("#id + .classname ")    //紧邻下一个元素选择器
$("#id ~ .classname ")    //兄弟元素选择器
```

### 3.过滤选择器(重点)
#### 3.1 位置过滤
```js
$("li:first")    //第一个li
$("li:last")     //最后一个li
$("li:even")     //挑选下标为偶数的li
$("li:odd")      //挑选下标为奇数的li
$("li:eq(4)")    //下标等于 4 的li(第五个 li 元素)
$("li:gt(2)")    //下标大于 2 的li
$("li:lt(2)")    //下标小于 2 的li
$("li:not(#runoob)") //挑选除 id="runoob" 以外的所有li
```

#### 3.2内容过滤选择器
```js
$("div:contains('Runob')")    // 包含 Runob文本的元素
$("td:empty")                 //不包含子元素或者文本的空元素
$("div:has(selector)")        //含有选择器所匹配的元素
$("td:parent")                //含有子元素或者文本的元素
```

#### 3.3可见性过滤选择器
```js
$("li:hidden")       //匹配所有不可见元素，或type为hidden的元素
$("li:visible")      //匹配所有可见元素
```
#### 3.4属性过滤选择器
```js
$("div[id]")        //所有含有 id 属性的 div 元素
$("div[id='123']")        // id属性值为123的div 元素
$("div[id!='123']")        // id属性值不等于123的div 元素
$("div[id^='qq']")        // id属性值以qq开头的div 元素
$("div[id$='zz']")        // id属性值以zz结尾的div 元素
$("div[id*='bb']")        // id属性值包含bb的div 元素
$("input[id][name$='man']") //多属性选过滤，同时满足两个属性的条件的元素
```
#### 3.5状态过滤选择器
```js
$("input:enabled")    // 匹配可用的 input
$("input:disabled")   // 匹配不可用的 input
$("input:checked")    // 匹配选中的 input
$("option:selected")  // 匹配选中的 option
```
### 4.表单选择器
```js
$(":input")      //匹配所有 input, textarea, select 和 button 元素
$(":text")       //所有的单行文本框，$(":text") 等价于$("[type=text]")，推荐使用$("input:text")效率更高，下同
$(":password")   //所有密码框
$(":radio")      //所有单选按钮
$(":checkbox")   //所有复选框
$(":submit")     //所有提交按钮
$(":reset")      //所有重置按钮
$(":button")     //所有button按钮
$(":file")       //所有文件域
```
