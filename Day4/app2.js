const express=require('express');
const fs=require('fs/promises');

const app=express();

let users=[];
app.use(express.json());

const readdata=async ()=>{
    users=JSON.parse(await fs.readFile('./data.json','utf-8'))
}
const writedata=async ()=>{
    await fs.writeFile('./data.json',JSON.stringify(users))
}
readdata();

app.get('/getdata',async (req,res)=>{
    res.json(users);
})

app.post('/users',(req,res)=>{
    const {name,age}=req.body;
    const newid=users.length>0?users[users.length-1].id+1:1;
    const newuser={id:newid,name,age};
    users.push(newuser);
    writedata();
    res.status(200).json({message: 'User Register Success',data:newuser});
})

app.put('/users/:id',(req,res)=>{
    const uid=parseInt(req.params.id);
    const {name,age}=req.body;
    const userIndex=users.findIndex((user)=>user.id===uid);
    if (!name || !age)
    {
        res.status(400).json({message: 'name and age are required'})
    }
    if (userIndex===-1)
    {
        res.status(404).json({message: 'user not found'});
    }
    else{
        users[userIndex].name=name;
        users[userIndex].age=age;
        writedata();
        res.status(200).json({message:"user updated successfully", data:users[userIndex]});
    }
})

app.delete('/users/:id',(req,res)=>{
    const uid=req.params.id;
    console.log(uid)
    const userIndex=users.findIndex((user)=>user.id==uid);
    if (userIndex==-1)
    {
        return res.status(404).json({message: 'user not found'});
    }
    else{
        users.splice(userIndex,1);
        writedata();
        res.status(200).json({message:"user deleted successfully"});
    }

})

app.listen(9000,(e)=>{
    if (e)
        console.log(e)
    console.log("Port is running on 9000");
})