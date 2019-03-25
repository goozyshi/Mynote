# 算法
## 一. [数组](https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/)
### 1. [Single Number](https://leetcode.com/problems/single-number/)
给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。


*Example 1:*
```
Input: [2,2,1]
Output: 1
```
*Example 2:*
```
Input: [4,1,2,1,2]
Output: 4
```
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */

 /**
  *思路-按位异或
  * 前提：数组中只有一个数不同，其他两两相同
  * 1 = 2^1^2^3^4^3^4
  */
var singleNumber = function(nums) {
  let i = 0;
  nums.map((item)=>{
    i ^= item;
  })
  return i
};
```
### 2. [Rotate Array](https://leetcode.com/problems/rotate-array/)
给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
*Example 1:*
```
Input: [1,2,3,4,5,6,7] and k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
```
*Example 2:*
```
Input: [-1,-100,3,99] and k = 2
Output: [3,99,-1,-100]
Explanation: 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]
```
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

  /**
    * 思路1-循环取出最后一个补到前面
    */
  var rotate = function(nums, k) {
    while(k){
        nums.unshift(nums.pop())
        k--;
    }
  };
  /**
    * 思路2-数组截断再连接
    */
  var rotate = function(nums, k) {
    var a = nums.splice(nums.length-k);
    nums.splice(0,0,...a)
  };
```
### 3. [Intersection of Two Arrays II](https://leetcode.com/problems/intersection-of-two-arrays-ii/)
给定两个数组，编写一个函数来计算它们的交集。

*Example 1:*
```
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]
```
*Example 2:*
```
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
```
*Note:*
- Each element in the result should appear as many times as it shows in both arrays.
- The result can be in any order.

*Follow Up:*
- What if the given array is already sorted? How would you optimize your algorithm?
- What if nums1's size is small compared to nums2's size? Which algorithm is better?
- What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?
```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    
};
```
### 4. [Two Sum](https://leetcode.com/problems/two-sum/)
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

*Example:*
```
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

 /**
  * 思路1-两遍循环
  */
var twoSum = function(nums, target) {
  for(let i =0; i < nums.length; i++){
    let an = target - nums[i];
    for(let j = i+1; j < nums.length; j++){
      if(nums[j] == an){
        return [i,j]
      }
    }
  }
};
```