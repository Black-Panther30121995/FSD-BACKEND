const http = require('http')
const server = http.createServer((req,res)=>{
    if(req.url==='/home')
    {
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end("Welcome to the homepage");
    }
    else if(req.url==='/about')
    {
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end("This is about page");
    }
    else if(req.url==='/contact')
    {
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end("This is contact page");
    }
    else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end("Page not found");
    }
})

server.listen(9000,(err)=>{
    if(err)
    {
        console.log(err)

    }
    console.log('Server is running on port : 9000')
})