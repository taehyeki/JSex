var fs = require('fs');

var input = process.env.QUERY_STRING;

input = decodeURIComponent(input);
var num = input.split('=')[1];


  var json = fs.readFileSync('json.json');
  json = json.toString();
  var article = JSON.parse(json);

  var html =`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>`
  html += `<p>${article[num].title}</p><br>
           <p>${article[num].content}</p><br>
           <a href='list.cgi.js'>목록으로</a>`;

  html += `</body>
  </html>`;
  console.log('Content-Type: text/html');
  console.log('Content-Length: ' + Buffer.from(html).length);
  console.log('');
  process.stdout.write(Buffer.from(html));
