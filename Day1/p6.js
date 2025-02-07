const fs=require('fs');
data='this is shivani'
fs.appendFile('./data.txt',data,(err,data)=>{
    if(err){
        console.log("Error writing the file",err);
        return;
    }
    console.log(data);
});