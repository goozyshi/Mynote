function link () {
  let temp_total = []
  let res = []
  for (let i = 0; i < 153; i++) {
    temp_total.push(i)
  }
  console.log('temp_total', temp_total)
  let p = Math.ceil(temp_total.length/10)
  for (let i = 0; i < p; i++) {
    res.push(...temp_total.slice(i*10,(i+1)*10))
  }
}