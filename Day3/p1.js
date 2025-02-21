const http=require('http');

const server=http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'application/json'});
    if (req.url === '/getdata' && req.method ==='GET'){
        const data={name:'Shivani',age:20};
        res.end(JSON.stringify(data));
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
            res.end(JSON.stringify({message:'Data received successfully'}));
        });
        return;
    }
});

server.listen(9000,()=>{
    console.log('Server is running on port 9000');
});