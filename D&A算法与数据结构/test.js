/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    for (let i = digits.length-1; i >=0;) {
			let x = digits[i] +1;
			console.log('digits', digits)
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