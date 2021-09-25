var net = require('net'); 
var fs = require('fs');
var mime = require('mime-types');
var cp = require('child_process');
var server = net.createServer(function(client){
  client.on('data',function(buf){
    if(buf.indexOf('\r\n\r\n') > 0){
      var httpReq = buf.toString();
      var httpReqLine = httpReq.split('\r\n');
      var httpMet = httpReqLine[0].split(' ')[0];
      var httpRes = httpReqLine[0].split(' ')[1];
      var httpVer = httpReqLine[0].split(' ')[2];
      if ( httpRes[httpRes.length-1] == '/'){
        httpRes += 'index.html';
      }
      var httpQuery;
      if ( httpRes.indexOf('?') > 0){
        httpQuery = httpRes.split('?')[1];
        httpRes = httpRes.split('?')[0];
      }
      var httpHeads = {};
      for (var i=1; i<httpReqLine.length-1;i++){
        httpHeads[httpReqLine[i].split(': ')[0]] = httpReqLine[i].split(': ')[1];
      }
      var PostPayLoad;
      if(httpMet != 'get' && httpHeads['Content-Type'] && httpHeads['Content-Length'])
        // PayLoad가 있을 경우 지정
        PostPayLoad = httpReqLine[i]
      
    
      if (fs.existsSync(__dirname + '/files' + httpRes)){
        if (httpRes.indexOf('.cgi.js') > 0 ){
          var cgiProcess = cp.exec('node ' + __dirname + '/files' + httpRes, {env :{
            QUERY_STRING: httpQuery
          }}, function(err,std,stderr){
            console.log(stderr);
            var httpResponse = 'HTTP/1.1 200 OK\r\n'
            client.write(Buffer.from(httpResponse));
            client.write(std);
            client.write(Buffer.from('\r\n'));
          })
          if(PostPayLoad){
            console.log(PostPayLoad);
            cgiProcess.stdin.write(Buffer.from(PostPayLoad+'\n'));
          }
        } else {
          var httpContent = fs.readFileSync(__dirname + '/files' + httpRes);
          var httpConSize = fs.statSync(__dirname + '/files' + httpRes);
          var httpResponse = 'HTTP/1.1 200 OK\r\n' +
                             `Content-Type: ${mime.lookup(__dirname + '/files' + httpRes)}\r\n` +
                             'Content-Length: ' + httpConSize.size + '\r\n\r\n';
          client.write(Buffer.from(httpResponse));
          client.write(httpContent);
          client.write(Buffer.from('\r\n'));
        }
      } else {
        var httpContent = fs.readFileSync(__dirname+'/files/error.html');
        var httpResponse = 'HTTP/1.1 404 FILE NOT FOUNDED\r\n' +
                           'Content-Type: text/html\r\n' +
                           'Content-Length: ' + (fs.statSync(__dirname + '/files/error.html').size) + '\r\n\r\n';
        client.write(Buffer.from(httpResponse));
        client.write(httpContent);
        client.write(Buffer.from('\r\n'));

      }
    }
    


  })
});

server.listen(3000,function(){
  console.log('3000 port on');
})