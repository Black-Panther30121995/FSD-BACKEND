const http=require('http');
const users=[];
const server=http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'application/json'});
    if (req.url === '/getdata' && req.method ==='GET'){

        res.end(JSON.stringify(users));
        return;
    }
    else if(req.url==='/setdata' && req.method==='POST')
    {
        let body ='';
        req.on('data',chunk=>{ //concatenates the data
            body+=chunk;
        });

        req.on('end',()=>{
            const data=JSON.parse(body);
            console.log('Received data:', data);
            users.push(data);
            res.end(JSON.stringify({message:'Data received successfully'}));
        });
        return;
    }
});

server.listen(9000,()=>{
    console.log('Server is running on port 9000');
});