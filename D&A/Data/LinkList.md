# 链表
## 1. 单向链表
```javascript 
  // 节点类
  function Node (element){
    this.element = element;
    this.next = null;
  }
  // 链表类
  function LinkList (){
    this.head = new Node('head'); // 头节点
    this.findValue = findValue; // 查找 当前/前一 节点
    this.insert = insert; // 在某节点后插入
    this.create = create; // 循环创建
    this.remove = remove; // 删除某个节点
    this.display = display; // 展示链表
  }
  /**
  * 按值查找
  * 从头节点开始，找不到或者还未指向null时向下遍历
  */
  function findValue (x, pre){
    var current = this.head;
    if( pre ){// 查找前一节点
      while( (current.next!=null) && current.next.element != x){
        current = current.next;
      }
    }else { // 查找当前节点
      while ( (current.next != null) && (current.element != x) ){
        current = current.next;
      }
    }
    return current ;
  }
  /**
  *插入
  *先创建一个新节点，找出插入位置,进行插入
  */
  function insert (x, val){
    var nNode = new Node(x);
    var current = this.findValue(val);
    nNode.next = current.next;
    current.next = nNode;
    return this.display()
  }
  /**
  *创建
  *传入一个最大序号k，循环创建节点head->1->...->k->null
  */
  function create (k){
    for(var i = 0; i<k; i++){
      if(i == 0){
        this.insert(1,'head');
      }else {
        this.insert(i+1, i);
      }
    }
    return this.display()
  }
  /**
  *删除
  *查找删除节点的前一节点的位置
  */
  function remove (x){
    var pre = this.findValue(x, true);
    pre.next = pre.next.next;
    return this.display()
  }
  
  /**
  * 展示
  * 从头指针开始遍历,返回head->1->...->null的字符串
  */
  function display (){
    var current = this.head;
    var result = [];
    while(current.next != null){
      result.push(current.element);
      current = current.next;
    }
    if(current.next == null){
      result.push(current.element)
    }
    return result.join('->');
  }

  var L = new LinkList();
  L.create(5);
  
```