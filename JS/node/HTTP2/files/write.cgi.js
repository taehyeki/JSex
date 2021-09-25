
var fs = require('fs');

function removePlus(str){
  var ret = str;
  while(ret.indexOf('+') != -1) ret = ret.replace('+',' ');
  return ret;
}

process.stdin.on('data',function(buf){
  var inputData = {};
  str = buf.toString().slice(0,-1);
  str.split('&').forEach(function(str){
    inputData[str.split('=')[0]] = removePlus(decodeURIComponent(str.split('=')[1]));
  })
  var json = fs.readFileSync('json.json');
  json = json.toString();
  var article = JSON.parse(json);
  article.unshift(inputData);
  fs.writeFileSync('json.json', Buffer.from(JSON.stringify(article)));
  var html =`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>location.href = 'list.cgi.js' </script>
  </head>
  <body>
  </body>
  </html>`;
  console.log('Content-Type: text/html');
  console.log('Content-Length: ' + Buffer.from(html).length);
  console.log('');
  process.stdout.write(Buffer.from(html));
  process.exit();
})