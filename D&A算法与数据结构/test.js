/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
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