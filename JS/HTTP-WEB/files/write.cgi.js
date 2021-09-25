// var fs = require('fs');
// var input = process.env.QUERY_STRING;
// input = decodeURIComponent(input);
// var inputData = {};

// if(input.indexOf('&') > 0){
//   input.split('&').forEach(function(str){
//     inputData[str.split('=')[0]] = str.split('=')[1];
//   })
// }

// var article = fs.readFileSync('article.json');
// article = article.toString();
// article = JSON.parse(article);
// article.unshift(inputData); 


// fs.writeFileSync('article.json', Buffer.from(JSON.stringify(article)));

// var httpContent = `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <meta charset="UTF-8">
  
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>List</title>
//   <script>location.href = 'list.cgi.js';</script>
// </head>
// <body>
// </body>
// </html>`;


// console.log('Content-Type: text/html');
// console.log('Content-Length: ' + Buffer.from(httpContent).length);
// console.log("");
// process.stdout.write(httpContent);
var fs = require('fs');
function rem(str){
  var ret = str;
  while(ret.indexOf('+') != -1) ret = ret.replace('+',' ');
  return ret;
}

process.stdin.on('data',function(buf){
  process.stderr.write('오류');
  var str = buf.toString()
  str = str.slice(0,-1);
  var postData = {};
  str.split('&').forEach(function(str){
    postData[str.split('=')[0]] = rem(decodeURIComponent(str.split('=')[1]));
  }) 
  var jsonData = fs.readFileSync('article.json');
  jsonData = jsonData.toString();
  var article = JSON.parse(jsonData);
  article.unshift(postData);
  fs.writeFileSync('article.json', Buffer.from(JSON.stringify(article)) )
  var html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>location.href = 'list.cgi.js'</script>
    <title>write.cgi.js</title>
  </head>
  <body>
  </body>
  </html>`;
  console.log('Content-Type: text/html');
  console.log('Content-Length: ' + Buffer.from(html).length);
  console.log('')
  process.stdout.write(Buffer.from(html));
  process.exit();
})