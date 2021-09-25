var fs = require('fs');


var json = fs.readFileSync('json.json');
json = json.toString();
var article = JSON.parse(json);

  var html =`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>`;
  for(var i =0; i<article.length; i++){
    html += `<a href='read.cgi.js?index=${i}'>${article[i].title}</a><br>`
  }

  html += `<a href='write.html'>글쓰기</a>
  </body>
  </html>`;
  console.log('Content-Type: text/html');
  console.log('Content-Length: ' + Buffer.from(html).length);
  console.log('');
  process.stdout.write(Buffer.from(html));

