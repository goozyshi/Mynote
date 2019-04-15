/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
	var map = {}
	for (let i = 0; i < nums.length; i++) {
		let goal = target - nums[i];
		if(map.has(goal)){
			return [ map.get(goal), i]
		}
		map.set(nums[i],i)
		console.log(map)
	}
};