/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if(!nums){
    return;
  }
  var p = 0;
  for(var i=1; i<nums.length; i++){
    if(nums[i]>nums[p]){
      nums[++p]=nums[i]
    }else{
      continue;
    }
  }
  return p+1;
};