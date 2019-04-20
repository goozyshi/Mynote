/**
 * @param {string} s
 * @return {boolean}
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