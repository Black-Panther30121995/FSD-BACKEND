const express=require('express');
const fs=require('fs');

const app=express();

let users=[];
app.use(express.json());

const readdata=()=>{
    users=fs.readFile('./data.json','utf-8')
}
const writedata=()=>{
    fs.writeFile('./data.json',JSON.stringify(users,null,2))
}
app.get('/getdata',async (req,res)=>{
    readdata();
    res.json(users);
})

app.listen(9000,(e)=>{
    if (e)
        console.log(e)
    console.log("Port is running on 9000");
})