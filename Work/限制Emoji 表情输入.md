## 限制 emoji 输入
### 常规
通过对文本进行正则校验，提示用户不能输入 emoji 表情。（校验规则可能不完善）

或者

监听键盘，符号界面禁止输入（输入法不同，监听难易程度不同，而且越来越多的输入法可以不用切换界面而打出表情）
```
  // 只可限制安卓和 windows 上的表情
  var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
  if(user_string.match(regRule)) {
      user_string = user_string.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
      alert("不支持表情");
      return false
  }

  // 改善： 扩大验证范围
  let regRule = /[\ud800-\udbff][\udc00-\udfff]/g;
  if(remark.match(regRule)) {
    remark = remark.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
    show_alert_message('error', '请输入合法的文字及符号')
    return false
  }
```
### 较完备的解决方案
前端将用户输入用 Unicode / Base64 进行转码，从服务器拿回时再解码。

- 转码：
```
function utf16toEntities(str) {
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    str = str.replace(patt, function (char) {
      var H, L, code;
      if (char.length === 2) {
        H = char.charCodeAt(0); // 取出高位
        L = char.charCodeAt(1); // 取出低位
        code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
        return "&#" + code + ";";
      } else {
        return char
      }
    })

    return str
}
```
- 解码：
```
function uncodeUtf16(str){
    var reg = /\&#.*?;/g;
    var result = str.replace(reg, function (char) {
      var H, L, code;
      if (char.length == 9) {
        code = parseInt(char.match(/[0-9]+/g));
        H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
        L = (code - 0x10000) % 0x400 + 0xDC00;
        return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
      } else {
        return char;
      }
    });
    return result;
  }
```
![](https://github.com/goozyshi/blog/raw/master/docs/post/work/imgs/work_encode.png)