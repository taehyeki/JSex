
var input = process.env.QUERY_STRING;

input = decodeURIComponent(input);

var content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <p>${input}</p>
</body>
</html>`;

console.log('Content-Type: text/html');
console.log('Content-Length: '+Buffer.from(content).length);
console.log("");
process.stdout.write(Buffer.from(content));