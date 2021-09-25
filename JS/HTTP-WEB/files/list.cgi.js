var fs = require('fs');

var article = fs.readFileSync('article.json');
article = article.toString();
article = JSON.parse(article);

var httpContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>list</title>
</head>
<body>`;

for(var i=0; i<article.length; i++){
  httpContent += `<a href='read.cgi.js?index=${i}'> ${i}번째 제목 :`+article[i].subject +'</a><br>'
}

httpContent += `<br><a href='write.html'>글쓰기</a></body>
</html>`;

console.log('Content-Type: text/html');
console.log('Content-Length: '+ Buffer.from(httpContent).length);
console.log("");
process.stdout.write(Buffer.from(httpContent));