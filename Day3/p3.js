const http=require('http');
const fs=require('fs/promises');

const server=http.createServer(async(req,res)=>{
    res.writeHead(200,{'content-type':'application/json'});
    if (req.url === '/getdata' && req.method ==='GET'){
        const data=await fs.readFile("./data.json","utf-8");
        res.end(data);
        return;
    }
    else if(req.url==='/setdata' && req.method==='POST')
    {
        let body ='';
        req.on('data',chunk=>{ //concatenates the data
            body+=chunk;
        });

        req.on('end',async ()=>{
            const data=JSON.parse(body);
            console.log('Received data:', data);
            let s=[]
            try{
                const fd=await fs.readFile("./data.json","utf-8");
                s=JSON.parse(fd);
            }
            catch(err)
            {
                console.log(err);
            }
            if(!Array.isArray(s)){
                s=[];
            }
            s.push(data);
            await fs.writeFile("./data.json",JSON.stringify(s,null,2));
            res.end(JSON.stringify({message:'Data received successfully'}));
        });
        return;
    }
});

server.listen(9000,()=>{
    console.log('Server is running on port 9000');
});