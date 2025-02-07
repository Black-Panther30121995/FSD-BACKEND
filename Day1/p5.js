const fs=require('fs');
data='hello there'
fs.writeFile('./data.txt',data,(err,data)=>{
    if(err){
        console.log("Error writing the file",err);
        return;
    }
    console.log(data);
});