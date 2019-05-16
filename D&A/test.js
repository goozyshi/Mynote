var getRow = function(rowIndex) {
  var row = [1];
  for (var i = 1 ; i <= rowIndex ; i++) {
    console.log('i', i)
    for (var j = i; j > 0; j--) {
      console.log('j', j)
      if (j === i) {
        row[j] = 1;
      } else {
        row[j] = row[j - 1] + row[j];
      }
    }
  }
  return row;
};