## 数组

### 一.存取函数
 1.  查找元素——`indexOf()`
 >用来查找传进来的参数在目标数组中是否存在。
如果目标数组包含该参数,就返回该元素在数组中的索引;如果不包含,就返回 -1。

```javascript
var num =[56,23,45,7,23];
var p = num.indexOf(23);                    
var p_l = num.lastIndexOf(23)
var not = num.indexOf(222);
console.log(p,p_l,not)// 1,4,-1
```
  2. 字符串< = >数组
   - 字符串=>数组

  `split()`：该方法通过一些常见的分隔符,比如分
  隔单词的空格,将一个字符串分成几部分,并将每部分作为一个元素保存于一个新建的数
  组中

  ```javascript
  var sentence = "A B C D F";
  var words = sentence.split(" ");
  var newword=[];
  for (var i = 0;i<words.length;i++) {
    newword[i] = words[i];
  }
  console.log(newword);//["A","B","C","D","F"]
  ```
   - 数组=>字符串

   `toString()`：返回一个包含
数组所有元素的字符串,各元素之间用逗号分隔开。

   `join()`：默认返回一个以逗号隔开的字符串，`join("。")`则以句号隔开,`join("")`则不相隔。


 3.  已有数组创建新数组
  - `concat()`:合并多个数组返回一个`新数组`。
  - `splice()`:从现有数组里截取一个新数组,原数组被截取后而改变。该方法的第一个参数是截取的起始索引,第二个参数是截取的长度
```javascript
var num123 = [1,2,3];
var num45 = [4,5];
var old_num =num123.concat(num45);
console.log(old_num);//  [1, 2, 3, 4, 5]
console.log(num123);// [1,2,3]
var new_num = old_num.splice(1,3);
console.log(new_num);//  [2, 3, 4]
console.log(old_num);// [1,5]
```

### 二.可变函数
1. 为数组添加元素
 - `push()`:将一个元素添加到数组末尾
 - `unshift()`:将多个元素添加在数组的开头

 `push()`和`unshift()`方法的返回值是数组的长度
2. 从数组中删除元素
 - `pop()`:删除数组末尾的元素
 - `shift()`:删除数组的第一个元素

 `pop()` 和 `shift()` 方法都将删掉的元素作为方法的返回值返回,可用一个变量来保存删除的元素
3. 从数组中间位置添加和删除元素
 - `splice()`：第一个参数是起始索引,第二个参数是删除的个数（将这一部分以新数组形式截取出去），第三个参数是想要添加进数组的元素
```javascript
var nums = [1,2,3,100,200,300,400,4,5];
nums.splice(3,4,45);
console.log(nums);//  1,2,3,45,4,5
```
4. 为数组排序
 - `reverse()`:将数组中元素的顺序进行翻转
 - `sort()`:默认按照字典顺序对元素进行排序
 ```javascript
 var nums = [3,1,2,100,4,200];
 nums.sort();
 console.log(nums);//  [1, 100, 2, 200, 3, 4]
 function compare(num1, num2) {
   return num1 - num2;
  }
 nums.sort(compare);
 console.log(nums);//  [1, 2, 3, 4, 100, 200]
 ```

 ## 三.迭代器方法
 >对数组中的每个元素应用`一个函数`,可以返回一个值、一组值或者一个新数组

 1. 不产生新数组
  >对于数组中的每个元素执行某种操作,要么返回一个值

  - `forEach()`：接受一个函数作为参数,对数组中的每个元素使用该函数
  - `reduce()`:接受一个函数,返回一个值。该方法会从一个累加值开始,不断对累加值和数组中的后续元素调用该函数,直到数组中的最后一个元素,最后返回得到的累加值
   ```javascript
    function add(runningTotal, currentValue) {
    return runningTotal + currentValue;
    }
    var nums = [1,2,3,4,5,6,7,8,9,10];
    var sum = nums.reduce(add);
    print(sum); // 显示 55
  ```
 2. 产生新数组
    - `map()`:对数组中的每个元素使用某个函数,返回一个新的`数组`。
    - `filter()`：对数组中的所有元素应用该函数,结果均为 true 时,该方法返回一个包含应用该函数后结果为 true 的元素的新数组

## 四.二维数组
 - 创建
 ```javascript
Array.matrix = function(numrows, numcols, initial) {
var arr = [];
for (var i = 0; i < numrows; ++i) {
var columns = [];
for (var j = 0; j < numcols; ++j) {
columns[j] = initial;
}
arr[i] = columns;
}
return arr;
}
var nums = Array.matrix(3,3,0);//  [Array(3), Array(3), Array(3)]
```
 - 遍历二维数组(求每个班的平均数)
```javascript
 var grades = [[89, 77, 78, 67],[76, 82, 81],[91, 94, 89]];
 function aver(a) {
   var total = 0;
   for(let i = 0;i<a.length;i++){
     total = total+a[i];
   }
   let average = total/a.length;
   total = 0;
   return average;
 }
 var average = grades.map(aver);
 console.log(average);
```

## 五.练习
1. 添加并记录学生成绩，以及显示其平均成绩
```javascript
var cj = [];
function average(){
  var total = 0;
  for (let i = 0;i<cj.length;i++){
    total = total + cj[i];
  }
  return total/cj.length;
}
function add(grade){
  cj.push(grade);
  console.log(`学生成绩：${cj}`);
  var aver = average();
  console.log(`平均成绩：${aver}`);
}
```
2. 正序或倒序显示数组
```javascript
var word = ["a","b","apple","c",1,2,10]
var reg = /\d/;
function  compare(a,b) {
    return a - b;
}
function isNum(a){
  return reg.test(a)
}
function isLetter(a){
  return !reg.test(a)
}
var Num = word.filter(isNum).sort(compare)
var Letter = word.filter(isLetter).sort()
var L_N = Letter.concat(Num)
var N_L = L_N.reverse()
```
3. 将数组中的字母连成单词
```javascript
var obj = ["a","x","e"];
function connect(letter){
  return letter;
}
var word = obj.map(connect).join("");
console.log(word)
```
