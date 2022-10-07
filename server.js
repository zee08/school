const http = require ('http');

const server = http.createServer((req, res) => {

  res.end('this is irst respinec')
});

server.listen(3000);
