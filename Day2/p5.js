const http = require("http");
const fs = require("fs/promises");

const server = http.createServer(async (req, res) => {
  const data = await fs.readFile("./data.json");
  const mydata = JSON.parse(data);
  res.writeHead(200, { "content-type": "application/json" });

  const name = mydata.map((i) => {
    return i.name;
  });
  res.end(JSON.stringify(name));
});

server.listen(9000, (err) => {
  if (err) console.log(err);
  console.log("Server is running at http://localhost:9000/");
});
