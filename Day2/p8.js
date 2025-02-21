const http = require("http");

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  const data = await fetch("https://fakestoreapi.com/products");
  const jsonData = await data.json();
  const myhtml = `<html>
    <head>
    <title>
    My Products
    </title>
    <style>
    body
    {
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center
    }
    .container{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    max-width: 500px;
    flex-wrap:wrap;
    box-shadow: 5px 5px 10px gray;
    padding:10px;
    margin:0px;
    }
    h2{
    text-align:center;
    }
    </style>
    </head>
    <body>
    <h1>Products</h1>
    ${
        jsonData.map(i=>{
            return `<div class="container">
            <h2>${i.title}</h2>
            <p>${i.description}</p>
            <img src="${i.image}" height="200px" width="150px" alt="${i.title}">
            <p>$${i.price}</p>
            </div>`
        }).join("")
    }
    </body>
    </html>`;

  res.end(myhtml);
});

server.listen(9000, (err) => {
  if (err) throw(err);
  console.log("server is running on port http://localhost:9000");
});
