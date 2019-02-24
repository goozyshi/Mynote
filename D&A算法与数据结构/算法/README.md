# 排序
## 说明
- 稳定：如果a原本在b前面，而a=b，排序之后a仍然在b的前面；
- 不稳定：如果a原本在b的前面，而a=b，排序之后a可能会出现在b的后面；
- 内排序：所有排序操作都在内存中完成；
- 外排序：由于数据太大，因此把数据放在磁盘中，而排序通过磁盘和内存的数据传输才能进行；

- 时间复杂度: 一个算法执行所耗费的时间。
- 空间复杂度: 运行完一个程序所需内存的大小。
![算法比较](./algotime.png)
## 1. 基本排序
- ### 冒泡排序
比较相邻的两个元素，如果前一个比后一个大，则交换位置
```js
var str = '76 69 64 4 64 73 47 34 65 93 32';
var arr = str.split(' ');
function bubbleSort(arr) {
  console.time()
  for(var i = 0; i<arr.length-2; i++){
    for(var j = i+1; j<arr.length-1; j++){
      if( parseInt(arr[i]) > parseInt(arr[j]) ){
        [arr[i], arr[j]] = [arr[j], arr[i]]// es6 交换
      }
    }
  }
  console.timeEnd()
  return arr;
}
bubbleSort(arr);
```
- ### 选择排序
首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。
```js
function selectSort(arr) {
  console.time()
  for(var i = 0; i<arr.length-2; i++){
    var min = i;
    for(var j = i+1; j<arr.length-1; j++){
      if( parseInt(arr[min]) > parseInt(arr[j]) ){
        min = j;
      }
    }
    [arr[i],arr[min]]=[arr[min], arr[i]];
  }
  console.timeEnd()
  return arr;
}
selectSort(arr);
```
- ### 插入排序
插入排序有两个循环。 外循环将数组元素挨个移动， 而内循环则对外循环中选中的元素及它后面的那个元素进行比较。 如果外循环中选中的元素比内循环中选中的元素小，那么数组元素会向右移动， 为内循环中的这个元素腾出位置，。
```js
var str = '76 69 64 4 64 73 47 34 65 93 32';
var arr = str.split(' ');
function insertSort(arr) {
  console.time()
  for(var i = 1; i<arr.length-1; i++){
    var temp = arr[i];
    var j = i;
    while(j>0 && parseInt( arr[j-1]) >= parseInt(temp)){
      arr[j] = arr[j-1];
      --j;
    };
    arr[j]= temp;
  }
  console.timeEnd()
  return arr;
}
insertSort(arr);
```
## 2. 高级排序
- ### 希尔排序
- ### 归并排序
- ### 快速排序
### 3. 二分查找
### 4. 高级算法
- ### 动态规划
- ### 贪心算法