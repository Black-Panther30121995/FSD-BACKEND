const fs=require('fs')

const path=fs.mkdir('MyFolder',{recursive:true},(err)=>{
    if (err){
        console.error("An error occured: ",err);
        return;
    }
    console.log("Directory created sucessfully!");
});