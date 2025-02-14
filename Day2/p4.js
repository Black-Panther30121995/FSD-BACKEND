const http=require('http');
const fs=require('fs/promises');

const server=http.createServer(async(req,res)=>{
    res.writeHead(200,{'content-type':'application/json'});
    const data=await fs.readFile("./data.json");
    res.end(data);
});

server.listen(9000,(err)=>{
    if(err)
        console.log(err)
    console.log("Server is sunning on port http://localhost:9000")
})