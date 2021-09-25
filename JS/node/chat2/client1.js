var net = require('net');
var clientSocket = net.createConnection(3000,'127.0.0.1',function(client){
  process.stdin.on('data',function(buf){
    clientSocket.write(buf);
  })
  clientSocket.on('data',function(buf){
    process.stdout.write(buf);
  })
}) 