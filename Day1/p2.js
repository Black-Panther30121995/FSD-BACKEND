const fs=require('fs')

const data=fs.readFileSync("./data.txt","utf8")

console.log(data)