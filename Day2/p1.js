const http=require("http");

const server=http.createServer((req,res)=>{
    //res.status-code
    res.writeHead(200,{'Content-type':'text/plain'});
    res.end("Hello World!");
});

server.listen(9000,()=>{
    console.log("Server is running on port 9000");
});