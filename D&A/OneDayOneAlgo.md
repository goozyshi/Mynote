# 每天一道算法题
- 对于一道算法题，合理的思考方向更为重要
- 算法面试优秀不意味着技术面试优秀
- 技术面试优秀不意味着能拿Offer

1. 算法的准备范围
- 各种排序算法
- 基础数据结构和算法的实现: 堆，二叉树，图……
- 基础数据结构的使用：链表，栈，队列，哈希表，图，Trie，并查集……
- 基础算法： 深度优先，广度优先，二分查找，递归……
- 基本算法思想： 递归，分支，回溯搜索，贪心，动态规划……

## 学习和实践做题中要掌握一个平衡

2. 解决算法问题的思路
- 注意题目的隐含条件
- 没有思路直接暴力

3. 数据规模
如果要在1s内解决问题：、
- O(n^2)算法可以解决**10^4**级别的数据
- O(n)算法可以解决**10^8**级别的数据
- O(nlogn)算法可以解决**10^7**级别的数据

空间复杂度：
- 多开一个辅助数组： O(n)
- 多开一个辅助的二维数组：O(n^2)
- 多开常数空间： O(1)

## 2019-04-09
### [283.Move Zeros](https://leetcode.com/problems/move-zeroes/)
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:
  ```
  输入: [0,1,0,3,12]
  输出: [1,3,12,0,0]
  ```
说明：
  ```
  1. 必须在原数组上操作，不能拷贝额外的数组。
  2. 尽量减少操作次数。
  ```
**【解决】**
```js
/**
 * @思路：对 nums 重新赋值，不等于零的依次赋值，剩下的全都赋为0
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var moveZeroes = function(nums) {
  var count = 0;
  for (let i = 0; i < nums.length; i++) {
    if(nums[i]!==0){
      nums[count++]=nums[i]
    }
  }
  for (let i = count; i < nums.length; i++) {
    nums[i]=0
  }
  // console.log(nums)// test
};
```
**【另一种】**
```js
/**
 * @思路：遍历数组，将不为 0 的值与 k 位置进行交换，交换后 k+1
 * @时间复杂度 O(n)
 * @空间复杂度 O(n)
 */
var moveZeroes = function(nums) {
  var k = 0;
  for (let i = 0; i < nums.length; i++) {
    if(nums[i]!==0){
      let temp = nums[i]
      nums[i] = nums[k]
      nums[k++] = temp
    }
  }
  return nums
};
```
## 20190410
### [27. Remove Element](https://leetcode.com/problems/remove-element/)
给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
示例 1:
```
给定 nums = [3,2,2,3], val = 3,

函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。

你不需要考虑数组中超出新长度后面的元素。
```
**【解决】**
```js
/**
 * @思路：先排序，从后向前遍历数组，将相同元素使用splice方法删除，一旦出现小于该元素的直接break跳出循环
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var removeElement = function(nums, val) {
  nums = nums.sort((a,b)=>a-b);
  for(var i=nums.length-1; i>=0; i--){
    if(nums[i] == val) {
      nums.splice(i,1);
    }else if(nums[i]<val){
      break;
    }
  }
  return nums.length
};
```
**【另一种】**
```js
/**
 * @思路 从前（零位置）往后遍历数组。使用一个下标 p 从零开始在不相等的情况下为数组重新赋值，类似于开拓一个新的数组。最后返回p即可
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var removeElement = function(nums, val) {
  var p = 0;
  for(var i=0; i<nums.length; i++){
    if(nums[i] != val){
      nums[p++] = nums[i]
    }else {
      continue
    }
  }
  return p
};
```

## 20190411
### [26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

示例 1:
```
给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

你不需要考虑数组中超出新长度后面的元素。
```
**【解决】**
```js
/**
 * @思路 从1位置往后遍历数组。使用一个下标 p 从零开始在不相等的情况下为数组重新赋值，然后 p 位置往右挪一位。最后返回p+1数组长度即可
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var removeDuplicates = function(nums) {
    if(nums.length == 0){
      return;
    }
    var p = 0;
    for(var i=1; i<nums.length; i++){
      if(nums[i]!=nums[p]){
        nums[++p]=nums[i]
      }
    }
    return p+1;
};
```
**【另一种】**
```js
/**
 * @思路 新建一个set对象，当然已经额外申请空间离题了。算法题中不建议使用现成的，但实际业务可以考虑
 * @时间复杂度 O(n)
 * @空间复杂度 O(n)
 */
var removeDuplicates = function(nums) {
  var a =  new Set(nums)
  return a.size
};
```
## 20190412
### [80. Remove Duplicates from Sorted Array II](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/)

给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素最多出现两次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

示例 1:
```
给定 nums = [1,1,1,2,2,3],

函数应返回新长度 length = 5, 并且原数组的前五个元素被修改为 1, 1, 2, 2, 3 。

你不需要考虑数组中超出新长度后面的元素。
```
**【解决】**
```js
/**
 * @思路 新建一个下标 pos 和一个计数变量 count ，从 1 位置开始往后遍历，相等且计数次数小于2（即最多重复两次），对 nums 移动赋值。在不相等的情况下，赋值并让 count 归零。最终返回长度，所以是下标加一。
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var removeDuplicates = function(nums) {
    var pos = 0;
    var count = 0;
    for (let i = 1; i < nums.length; i++) {
      if(nums[pos] == nums[i]){
        if(count<1){
          nums[++pos] = nums[i];
          count ++;
        }
      }else {
        nums[++pos] = nums[i];
        count=0
      }
    }
    return pos+1
};
```
**【另一种】**
```js
/**
 * @思路 简化上述思路，并充分利用已排序的条件。
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var removeDuplicates = function(nums) {
  var p = 0;
  for (var i = 0; i < nums.length; i++) {
    if(i<2 || nums[i]>nums[p-2]){
      nums[p++]=nums[i]
    }
  }
  return p;
};
```
## 20190413
### [75. Sort Colors](https://leetcode.com/problems/sort-colors/)

给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

注意:
不能使用代码库中的排序函数来解决这道题。

示例:
```
输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]
```
进阶：
- 一个直观的解决方案是使用计数排序的两趟扫描算法。
首先，迭代计算出0、1 和 2 元素的个数，然后按照0、1、2的排序，重写当前数组。

- 你能想出一个仅使用常数空间的一趟扫描算法吗？

**【解决】**
```js
/**
 * @思路 两趟扫描，记录下 0，1，2 出现次数，重新赋值
 * @时间复杂度 O(n)
 * @空间复杂度 O(n)
 */
var sortColors = function(nums) {
  var z = 0; // zero
  var o = 0; // one 
  
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if(x==0){
      z++
    }else if(x==1){
      o++
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if(i<z){
      nums[i] = 0
    }else if(i<z+o){
      nums[i] =1 
    }else {
      nums[i] = 2
    }
  }
  return nums
};
```
**【另一种】**
```js
/**思路：快排思想，一趟扫描。从左到右遍历，小于 1 的放在左边start，大于 1 的放在右边end。
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var sortColors = function(nums) {
  var start = 0;
  var end = nums.length - 1;
  var temp = null;
  var i = 0;
  while (i <= end) {
    if (nums[i] === 0) {
        temp = nums[i];
        nums[i] = nums[start];
        nums[start++] = temp; 
        i++;
    }
    else if (nums[i] === 1) {
        i++;
    }
    else if (nums[i] === 2) {
        temp = nums[i];
        nums[i] = nums[end];
        nums[end--] = temp; 
    }
  }
};
```
## 20190415
### [1. Two Sum](https://leetcode.com/problems/two-sum/)
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:
```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```
**【解决】**
```js
/**思路：两次循环，返回相加为 target 的两个值的下标
 * @时间复杂度 O(n^2)
 * @空间复杂度 O(1)
 */
var twoSum = function(nums, target) {
for (let i = 0; i < nums.length; i++) {
	let goal = target - nums[i];
	for (let j = i+1; j < nums.length; j++) {
		if(nums[j] === goal){
			return [i,j]
		}
	}
}
};
```
**【另一种】**
```js
/**思路：使用哈希表一次遍历，再[7,2,8,9],10 这一组合中，一开始7=>0,2=>1,到8的时候，goal = 2, find = map[2] = 1.所以返回 [1，2]
 * @时间复杂度 O(n)
 * @空间复杂度 O(n)
 */
var twoSum = function(nums, target) {
	var map = {}
	for (let i = 0; i < nums.length; i++) {
		let goal = target - nums[i];
		let find = map[goal]
		if(find !== undefined){
			return [ find, i]
		}
		map[nums[i]]=i
	}
};
```
### [66. Plus One](https://leetcode.com/problems/plus-one/)
14号没做题，补上一道。

给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储一个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

示例 1:
```
输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。
```
示例 2:
```
输入: [9]
输出: [1,0]
解释: 输入数组表示数字 10。
```
**【解决】**
```js
/**思路：从后往前加1，若加1后的值不大于10，无需进位返回数组。大于 10 则当前值设为0，向前进位加1，当数组0下标位置仍需要进位时，数组前添加 1 ，返回数组。
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var plusOne = function(digits) {
	for (let i = digits.length-1; i >=0;) {
		let x = digits[i] +1;
		if(x<10){
			digits[i]=x
			return digits;
		}else {
			digits[i]=0
			if(i==0){
				digits.unshift(1)
				return digits
			}
			i--;
		}
	}
};
```
## 20190416
### [167.Two Sum II - Input array is sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

说明:
- 返回的下标值（index1 和 index2）不是从零开始的。
- 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
示例:
```
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
```
**【解决】**
```js
/** 哈希表
 * @时间复杂度 O(n)
 * @空间复杂度 O(n)
 */
var twoSum = function(numbers, target) {
    var hash = {}
    for (let i = 0; i < numbers.length; i++) {
      var goal = target - numbers[i];
      var find = hash[goal]
      if(find!=undefined){
        return[find+1,i+1]
      }
      hash[numbers[i]]=i
    }
};
``` 
**【另一种】**
```js
/** 思路： 头尾指针，和偏大尾向左，和偏小头向右
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var twoSum = function(numbers, target) {
  var l = 0
  var r = numbers.length-1;
  for(l,r;;){
    if(numbers[l]+numbers[r]>target)r--
    else if(numbers[l]+numbers[r]<target)l++
    else return l<r &&  [l+1,r+1]
  }
};
```
## 20190417
### [88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。

说明:
- 初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
- 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
示例:
```
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]
```
**【解决】**
```js
/** 思路： nums1数组从 m到 m+n 位置赋值为nums2中的值，之后排序nums1
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var merge = function(nums1, m, nums2, n) {
  var p = 0;
  for(var i = m;i<m+n;i++){
    nums1[i]=nums2[p++]
  }
  p=0;
  nums1.sort((a,b)=>a-b)
  return nums1
};

```
**【另一种】**
```js
/** 思路： 因为都是已排序数组，从后往前遍历赋值。
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var merge = function(nums1, m, nums2, n) {
	var total = m+n-1;
	var i = m-1;
	var j = n-1;
	while(i>=0 && j>=0){
		nums1[total--] = (nums1[i] > nums2[j]) ? nums1[i--] : nums2[j--]
	}
};
```
## 20190419
### [231. Power of Two](https://leetcode.com/problems/power-of-two/)
给定一个整数，编写一个函数来判断它是否是 2 的幂次方。

示例 1:
```
输入: 16
输出: true
解释: 2^4 = 16
```
**【One for All】**
同理还能解决：

[326. Power of Three](https://leetcode.com/problems/power-of-three/)

[342. Power of Four](https://leetcode.com/problems/power-of-four/)
```js
/** 思路： 换底公式牛批。一个数是2的幂那么幂一定是整数。2^power=n, power=log2(n),换底后log2(n)=log10(n)/log10(2)
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var isPowerOfTwo = function(n) {
    return Math.log10(n)/Math.log10(2)%1==0
};
```

### [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
18号补做。

在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:
```
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```

说明:

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

**【解决】**
```js
/** 思路： 排序，查询
 * @时间复杂度 O(nlogn)
 * @空间复杂度 O(1)
 */
var findKthLargest = function(nums, k) {
	nums.sort((a,b)=>b-a)
	return nums[k-1]
};
```
**【想用快拍没搞懂……】**
## 20190420
### [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)
给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

示例 1:
```
输入: "A man, a plan, a canal: Panama"
输出: true
```
**【解决】**
```js
/** 思路： 正则校验只留下英文数字，全部转为小写/大写。反转判断。
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var isPalindrome = function(s) {
  if(s.length == 0) {
    return true
  }
  let reg = /[^A-Za-z\d]/g;
  s = s.replace(reg, "").toLocaleLowerCase()
  let text = s.split('').reverse().join('')
  return s === text
};
```
**【另一种】**
```js
/** 思路： 头尾遇到英文数字时进行转大小写之后再比较，更快
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var isPalindrome = function(input) {
    var start = 0
    var end = input.length - 1
    while (start < end) {
        var s = input.charCodeAt(start)
        var e = input.charCodeAt(end)
    
        if (!isLetter(s)) {
            start++
            continue
        }
        if (!isLetter(e)) {
            end--
            continue
        }
    
        if (toLowerCase(s) !== toLowerCase(e)) {
            return false 
        } 
        start++
        end--
  }
  return true
};

var isLetter = function(code) {
    if (((code >= 48) && (code <= 57))  // numbers
    || ((code >= 65) && (code <= 90))  // uppercase
    || ((code >= 97) && (code <= 122))) {  // lowercase
        return true
    }
    else {
        return false
    }
}

var toLowerCase = function(code) {
    if (code >= 65 && code <= 90) {
        return code + 32    
    }
    else {
        return code
    }
}
```
## 20190421
### [344. Reverse String](https://leetcode.com/problems/reverse-string/)
编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

 

示例 1：
```
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```
**【解决】**
```js
/** 思路： 头尾指针相遇前交换位置
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var reverseString = function(s) {
  let p = s.length -1;
  for (let i = 0; i < s.length; i++) {
    if(p>i){
      let temp = s[p]
      s[p] = s[i]
      s[i] = temp
      p--
    }
  }
  return s
};
```
**【另一种】**
```js
/** 思路： 库函数
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var reverseString = function(s) {
  return s.reverse()
};
```
## 20190422
### [217. Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)
给定一个整数数组，判断是否存在重复元素。

如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。

示例 1:
```
输入: [1,2,3,1]
输出: true
```
示例 2:
```
输入: [1,2,3,4]
输出: false
```
**【解决】**
```js
/** 思路： 哈希表
 * @时间复杂度 O(n)
 * @空间复杂度 O(n)
 */
var containsDuplicate = function(nums) {
  var hash = {}
  for (let i = 0; i < nums.length; i++) {
    if(hash[nums[i]] !== undefined){
      return true
    }else {
      hash[nums[i]] = i
    }
  }
  return false
};
```
**【另一种】**
## 20190425
### [724. Find Pivot Index](https://leetcode.com/problems/find-pivot-index/)
给定一个整数类型的数组 nums，请编写一个能够返回数组“中心索引”的方法。

我们是这样定义数组中心索引的：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。

如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。

示例 1:
```
输入: 
nums = [1, 7, 3, 6, 5, 6]
输出: 3
解释: 
索引3 (nums[3] = 6) 的左侧数之和(1 + 7 + 3 = 11)，与右侧数之和(5 + 6 = 11)相等。
同时, 3 也是第一个符合要求的中心索引。
```
示例 2:
```
输入: 
nums = [1, 2, 3]
输出: -1
解释: 
数组中不存在满足此条件的中心索引。
```
**【解决】**
```js
/** 思路： 先计算 i=0 位置元素的左右和，随着i的右移，左边加上i位置，右边减去i位置。避免重复计算
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var pivotIndex = function(nums) {
  if(nums.length === 0){
    return -1
  }
  let L = 0;
  let R = 0;
  let total = 0;
  total=nums.reduce((x,y)=>x+y)
  R = total-L-nums[0]
  for (let i = 0; i < nums.length; i++) {
    if(L!=R){
      L+=nums[i]
      R-=nums[i+1]
    }else {
      return i
    }
  }
  return -1
};
```
**【解决】**
```js
/** 思路： 只要找到符合 X+nums[i]+X=total 的 nums[i] 就行
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var pivotIndex = function(nums) {
  if(nums.length === 0){
    return -1
  }
  let L = 0;
  let total = 0;
  total=nums.reduce((x,y)=>x+y)
  for (let i = 0; i < nums.length; i++) {
    if(total-nums[i] === L*2){
      return i
    }
    L+=nums[i]
  }
  return -1
};
```
**补做【24号】**
### [747. Largest Number At Least Twice of Others](https://leetcode.com/problems/largest-number-at-least-twice-of-others/)
在一个给定的数组nums中，总是存在一个最大元素 。

查找数组中的最大元素是否至少是数组中每个其他数字的两倍。

如果是，则返回最大元素的索引，否则返回-1。

示例 1:
```
输入: nums = [3, 6, 1, 0]
输出: 1
解释: 6是最大的整数, 对于数组中的其他整数,
6大于数组中其他元素的两倍。6的索引是1, 所以我们返回1.
```
**【解决】**
```js
/** 思路： 哈希表排序后比较返回
 * @时间复杂度 O(nlogn)
 * @空间复杂度 O(n)
 */
var dominantIndex = function(nums) {
  if(nums.length <2){
    return 0
  }
  var hash={}
  for (let i = 0; i < nums.length; i++) {
    if(hash[nums[i]] === undefined){
      hash[nums[i]]=i
    }
  }
  var arr = Object.keys(hash).sort((a,b)=>a-b)
  let max = arr.length-1;
  if(arr[max]>=2*arr[max-1]){
    return hash[arr[max]]
  }else {
    return -1
  }
};
```
**【另一种】**
```js
/** 思路： 遍历一遍记录最大值和第二大，返回比较
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var dominantIndex = function(nums) {
  if(nums.length <2){
    return 0
  }
  let max = 0;
  let max_2 = 0;
  let max_index = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      max_2 = max;
      max = nums[i];
      max_index = i;
  } else if (nums[i] > max_2) {
      max_2 = nums[i];
  }
  }
  return max<2*max_2?-1:max_index
};
```
**补做【23号】**
### [485. Max Consecutive Ones](https://leetcode.com/problems/max-consecutive-ones/)
给定一个二进制数组， 计算其中最大连续1的个数。

示例 1:
```
输入: [1,1,0,1,1,1]
输出: 3
解释: 开头的两位和最后的三位都是连续1，所以最大连续1的个数是 3.
```
**【解决】**
```js
/** 思路： 计数
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var findMaxConsecutiveOnes = function(nums) {
  var count = 0;
  var result = 0;
  for(let i=0; i<nums.length; i++){
      if(nums[i]===1){
          count++
          if(count>result)result = count
      }else{
          count=0
      }
  }
  return result
};
```
**另一种**
```js
/** 思路： 计数——优化代码
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var findMaxConsecutiveOnes = function(nums) {
  var count = 0;
  var result = 0;
  for(let i=0; i<nums.length; i++){
      if(nums[i]===1){
          count++
          result = Math.max(result,count)
      }else{
          count=0
      }
  }
  return result
};
```
## 20190426
### [189. Rotate Array](https://leetcode.com/problems/rotate-array/)
给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

示例 1:
```
输入: [1,2,3,4,5,6,7] 和 k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右旋转 1 步: [7,1,2,3,4,5,6]
向右旋转 2 步: [6,7,1,2,3,4,5]
向右旋转 3 步: [5,6,7,1,2,3,4]
```
**【解决】**
```js
/** 思路： 循环取出最后一个补到前面
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var rotate = function(nums, k) {
  while(k){
    nums.unshift(nums.pop())
    k--;
  }
};
```
**【另一种】**
```js
/** 思路： 截取、连接，不使用 concat 方法保证空间O(1)
 * @时间复杂度 O(n)
 * @空间复杂度 O(1)
 */
var rotate = function(nums, k) {
    var a = nums.splice(nums.length-k);
    nums.splice(0,0,...a)
};
```
