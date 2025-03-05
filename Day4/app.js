const express=require('express');

const app=express();

app.use(express.json());
let users=[];

app.get('api/users',(req,res)=>{
    res.send(users);
})

app.get('/users',(req,res)=>{
    res.send('Welcome to backend server using express');
});

app.post('/users',(req,res)=>{
    const data= req.body;
    const newid=users.length>0?users[users.length-1].id+1:1;
    data.id=newid;
    users.push(data);
    res.status(200).json({message: "data recieved", data:data});
})

app.listen(9000,(e)=>{
    if (e)
        console.log(e)
    console.log("App is running on port 9000");

})