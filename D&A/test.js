/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  s = s.split(' ')
  let res = []
  console.log('s', s)
  for (let i = s.length-1; i >= 0; i--) {
    if (s[i] != '') {
      res.push(s[i])
    }
    console.log(res)
  }
};