const fs=require('fs');
data='Hello there';
fs.readFile('./data.txt',data,(err,data)=>{
    if(err){
        console.log("Error writing the file",err);
        return;
    }
    console.log(data);
});