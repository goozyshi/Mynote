/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
  let res[0]= 1
  for (let i = 1; i < rowIndex+1; i++) {
    for (let j = i; j >= 1; j --) {
      res[j] == res[j-1]
    }
  }
  return res
};