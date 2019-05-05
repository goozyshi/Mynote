/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
  if (s === null || nums.length === 0) {
    return 0
  }
  let l = 0
  let r = 0
  let sum = 0
  let min = Infinity
  while (r < nums.length) {
    sum += nums[r ++]
    while (sum >= s) {
      min = Math.min(min, r-l)
      sum -= nums[l++]
    }
  }
  return min==Infinity?0:min
};