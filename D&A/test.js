var firstUniqChar = function(s){
  var map={};
  for(i=0;i<s.length;i++){
    if(map[s[i]]!=undefined){
        map[s[i]] = 2;
    }else{
      map[s[i]] = 1;
    }
  }
  for(i=0;i<s.length;i++){
    if(map[s[i]]!=undefined && map[s[i]]===1){
      return i;
    }
  }
  return -1;
};