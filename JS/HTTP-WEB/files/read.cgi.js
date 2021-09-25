var input = process.env.QUERY_STRING;
if(input.indexOf('=')>1){
  var num = input.split('=')[1];
}

var fs = require('fs');
var fileContent = fs.readFileSync('article.json');
fileContent = fileContent.toString();
var article = JSON.parse(fileContent);



var httpContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta charset="UTF-8">
  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>read files</title>
</head>
<body>
    <h1>${article[num].subject}</h1>
    <p>${article[num].content}</p>
    <a href='list.cgi.js'>목록으로</a>
</body>
</html>`;

console.log('Content-Type: text/html');
console.log('Content-Length: '+Buffer.from(httpContent).length);
console.log('');
process.stdout.write(Buffer.from(httpContent));