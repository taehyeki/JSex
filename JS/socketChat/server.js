const net = require('net');


let theClients =[];
let findNick = "";
let sayingWord;
const serverSocket = net.createServer(function(clientSocket){
  theClients.push(clientSocket);
  clientSocket.on('data',function(buf){
 
  if (!clientSocket.nickName) {
    clientSocket.nickName = buf.toString();
    process.stdout.write(Buffer.from(clientSocket.nickName + '님이 입장하셨습니다. !\n'));
  } else {
   if(buf.toString().startsWith('./')){
      sayingWord = buf.toString().split(" ");
      findNick = sayingWord[0].slice(2);
      let saying = "";
      for(var i=1; i<sayingWord.length; i++){
        saying += sayingWord[i] + ' ';
        saying = saying.slice(0,-1);
      }

      for(var i=0; i<theClients.length; i++){
        if(theClients[i].nickName == findNick){ 
          theClients[i].write(Buffer.from(clientSocket.nickName + '님께서 보낸 귓속말 : '));
          theClients[i].write(Buffer.from(saying));
          break;
        }      
      }
    } else {
    for(var i=0; i<theClients.length ; i++){
      theClients[i].write(Buffer.from('[ '+clientSocket.nickName + ' ] :' ));
      theClients[i].write(buf)
    }
   }
  }
 
 })
  clientSocket.on('error',function(){
    theClients.splice(theClients.indexOf(clientSocket),1);
    process.stdout.write(Buffer.from(clientSocket.nickName + '님이 퇴장하셨습니다. !\n'));
  });

});

serverSocket.listen(3000, function(){
  console.log('[채팅방에 오신걸 환영합니다 !]');
});