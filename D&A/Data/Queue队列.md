# 队列
先进先出，`First In First Out`

队头出队，队尾进队
 # 数组实现
 ```javascript 
 function Queue (){
   this.data = [];
   this.enqueue = enqueue; //队尾进队
   this.dequeue = dequeue; // 队头出队
   // 双向队列
   this.front_enqueue = front_enqueue; // 队头进队
   this.rear_dequeue = rear_dequeue; // 队尾出队
 }
 /**
 *  队尾进队
 */
 function enqueue (x){
   this.data.push(x);
 }

 /**
 *  队头出队
 */
 function dequeue (){
   (this.data.length == 0) && console.log(`队列已空`)
   this.data.shift();
 }

 /**
 *  队头进队
 */
 function front_enqueue (x){
   this.data.unshift(x);
 }

 /**
 *  队尾出队
 */
 function rear_dequeue (){
   (this.data.length == 0)&& console.log(`队列已空`)
   this.data.pop();
 }
 var q = new Queue();
 ```
