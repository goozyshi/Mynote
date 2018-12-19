# 树
一个`n`个结点的树有`n-1`条边

n=0,为空树

`n`个结点的判定树的深度为`[log2n] + 1`

## 相关术语
|术语|备注|
|:--:|:--:|
|结点的度|结点的子树个数|
|树的度|树的所有结点中最大的度数|
|叶结点|`度为0`的结点|
|父结点|有子树的结点|
|子结点|A为B的父结点，则B为A的子结点|
|兄弟结点|具有同一父结点的各个结点|
|路径和路径长度|从结点A到Bd的路径为一个序列,路径所包含的边即为路径的长度|
|树的深度|树中结点的最大层次|

# 二叉树
## 特殊二叉树
![tree_spa](../tree_spa.png)
## 二叉树性质
![tree_qua](../tree_qua.png)
## 二叉树操作
- 判空
- 遍历（递归实现）
>优化： 使用堆栈把递归变成非递归
  - 先序：根-左子树-右子树
  ```javascript
    function Porder (node){
      if(node){
        console,log(node.data)
        Porder(node.left)
        Porder(node.right)
      }
    }
  ```
  - 中序：左子树-根-右子树
  ```javascript 
    function Inorder (node){
      if(node){
        Inorder(node.left)
        console,log(node.data)
        InOrder(node.right)
      }
    }
  ```
  - 后序：左子树-右子树-根
  ```javascript
      function Lorder (node){
      if(node){
        Lorder(node.left)
        LOrder(node.right)
        console,log(node.data)
      }
    }
  ```
>优化： 使用队列把递归变成非递归
  - 层次：从上到下，从左到右
- 创建

## 题目
1. 输出所有叶子结点
2. 二叉树的高度
3. 二元表达式

# 二叉树
高效的插入删除以及查找

二叉查找树（BinaryTree）
```javascript
/**
*树的结点类
*/
function treeNode (data, left, right){
  this.data = data;
  this.left = left;
  this.right = right;
}

/**
* 二叉查找树类
* 初始根结点指向null，创建一个空结点
*/
function BinaryTree (){
  this.root = null; 
  this.insert = insert;
  this.Porder = Porder; // 先序遍历
  this.inorder = inorder; // 中序遍历
  this.Lorder = Lorder; // 后序遍历
}

/**
* 插入
* 为传入的data创建一个树结点
* 若BinaryTree的根结点为null，新结点为根结点
* 否则，用一个变量存储当前结点，循环遍历
* 插入的数据小于当前结点，设置当前结点为原结点的左结点（大于设为右结点）
* 当前左结点为null，插入并退出，否则进入下一次循环
*/
function insert (data){
  var n =  new treeNode(data, null, null);
  if(this.root == null){
    this.root = n;
  }else {
    var current = this.root;
    var parent;
    while (true){
      parent = current;
      if(data < current.data){
        current = current.left;
        if(current == null){
          parent.left = n;
          break;
        }
      }else {
        current = current.right;
        if(current == null){
          parent.right = n;
          break;
        }
      }
    }
  }
}

/**
* 先序遍历
* 根-左子树-右子树
*/
function Porder(node){
  if(node){
    console.log(node.data)
    Porder(node.left)
    Porder(node.right)
  }
}

/**
* 中序遍历
* 左子树和-根-右子树
*/
function inorder (node){
  if(node){
    inorder (node.left)
    console.log(node.data)
    inorder(node.right)  
  }
}

/**
* 后序遍历
* 左子树-右子树-根
*/
function Lorder (node){
  if(node){
    Lorder(node.left)
    Lorder(node.right)
    console.log(node.data+" ")
  }
}
var bst = new BinaryTree();
bst.insert(12)
bst.insert(10)
bst.insert(11)
bst.insert(32)
bst.insert(26)
bst.Porder(bst.root) // 12 10 11 32 26
bst.inorder(bst.root) // 10 11 12 26 32
bst.Lorder(bst.root) // 11 10 26 32 12
```