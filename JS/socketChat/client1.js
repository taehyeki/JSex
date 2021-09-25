const net = require('net');

let nickName = "";
const clientSocket = net.createConnection(3000, '127.0.0.1', function(){
  
  process.stdout.write(Buffer.from('사용하실 닉네임을 정해주세요 : '));
  process.stdin.on('data',function(buf){
    if(nickName == ""){
      nickName = buf.toString().slice(0,-2);
      clientSocket.write(Buffer.from(nickName));
    } else {
      clientSocket.write(buf);
    }
  })
  clientSocket.on('data',function(buf){
    process.stdout.write(buf);
  })

});