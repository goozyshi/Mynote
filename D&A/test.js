/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  if(nums.length == 0){
    return;
  }
  let count = 1;
  let major = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (count == 0) {
      count ++
      major = nums[i]
    } else if (major == nums[i]) {
      count ++
    } else {
      count --
    }
  }
  return major
};