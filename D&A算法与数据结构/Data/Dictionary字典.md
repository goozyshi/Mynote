# 字典
字典是一种以键 - 值对形式存储数据的数据结构，就像电话号码簿里的名字和电话号码一样。

JavaScript 的 `Object` 类就是以字典的形式设计的。

Dictionay 类的基础是 `Array` 类，而不是 Object 类。因为JS中是不能对`对象`的属性进行排序。
# Array实现
```javascript
  function Dictionary (){
    this.data = [];
    this.add = add;
    this.find = find;
    this.remove = remove;
    this.showall = showall;
  }
  function add (key, value){
    this.data[key] = value
  }
  function find (key){
    return this.data[key]
  }
  function remove (key){
    delete this.data[key]
  }
  function showall (){
    for (let key in Object.keys(this.data)){ // length属性当key为字符串时不管用
      console.log(key)
    }
  }
  var dict = new Dictionary();
```