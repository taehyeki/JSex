var net = require('net');
var fs = require('fs');
var mime = require('mime-types');
var cp = require('child_process');
const { Console } = require('console');
var httpRequestLines, httpRequest, httpMethod, httpResource, httpVersion, httpContent, httpResponse, httpPayLoad ;
var httpHeaders = {};
var server = net.createServer(function(client){
  // 웹브라우저가 웹서버에 접속했을 때
  client.on('data',function(buf){
    httpRequest = buf.toString();
    // 정상적으로 접속한 경우
    if(httpRequest.indexOf('\r\n\r\n') != -1){
      httpRequestLines = httpRequest.split('\r\n');
      // 메써드 리소스 버젼 헤더등을 정리
      httpMethod = httpRequestLines[0].split(' ')[0];
      httpResource = httpRequestLines[0].split(' ')[1];
      httpVersion = httpRequestLines[0].split(' ')[2];
      for(var i=1; i<httpRequestLines.length-2; i++){
        httpHeaders[httpRequestLines[i].split(': ')[0]] = httpRequestLines[i].split(': ')[1];
      }
      if(httpMethod != 'get' && httpHeaders['Content-Type'] && httpHeaders['Content-Length'])
        httpPayLoad = httpRequestLines[i+1];
      if(httpResource == '/'){
        httpResource = 'index.html'
      }
      console.log(httpMethod);
      if(httpResource.indexOf('?') != -1){
        var httpQueryString = httpResource.split('?')[1];
        httpResource = httpResource.split('?')[0];
      }
      if(fs.existsSync(__dirname + '/files/' + httpResource))
      {
        if(httpResource.indexOf('.cgi.js') != -1){
          var cgiProcess = cp.exec('node '+ __dirname + '/files/' + httpResource, {env: {
            QUERY_STRING: httpQueryString
          }},function(error,stdout,stderr){
           
            httpResponse = 'HTTP/1.1 202 OK\r\n';
            client.write(Buffer.from(httpResponse));
            client.write(stdout);
            client.write(Buffer.from('\r\n'));
          })
          if(httpPayLoad)
            cgiProcess.stdin.write(Buffer.from(httpPayLoad+'\n'));
        }else{
          httpContent = fs.readFileSync(__dirname + '/files/' + httpResource);
          httpResponse = 'HTTP/1.1 202 OK\r\n' +
                         'Content-Type: '+ mime.lookup(__dirname + '/files/' + httpResource) + '\r\n' +
                         'Content-Length: '+ fs.statSync(__dirname+'/files/'+httpResource).size + '\r\n\r\n';
          client.write(Buffer.from(httpResponse));
          client.write(httpContent);
          client.write(Buffer.from('\r\n'));  
        }
       
      }else{
        httpContent = fs.readFileSync(__dirname + '/files/not_founded.html');
        httpResponse = 'HTTP/1.1 404 NOT FOUNDED\r\n' +
                       'Content-Type: text/html\r\n' +
                       'Content-Length: '+ httpContent.length+ '\r\n\r\n';
        client.write(Buffer.from(httpResponse));
        client.write(httpContent);
        client.write(Buffer.from('\r\n'));
      }
    }
  })
});

server.listen(3000,function(){
  console.log('3000번 포트 연결 !');
})