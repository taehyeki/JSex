const { write } = require("fs");
var net = require("net");
var clients = [];
var serverSocket = net.createServer(function (clientSocket) {
  console.log("입장 !");
  clientSocket.write(Buffer.from("닉네임을 입력해주세요 :"));
  clients.push(clientSocket);
  clientSocket.on("data", function (buf) {
    if (!clientSocket.Nickname) {
      clientSocket.Nickname = buf.toString();
    }
    for (var i = 0; i < clients.length; i++) {
      clients[i].write(Buffer.from(clients[i].Nickname + ": " + buf));
    }
  });
});

serverSocket.listen(3000, function () {
  console.log("serverOn");
});
