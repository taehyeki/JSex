

// function removePlus(str){
//   var ret = str;
//   while(ret.indexOf('+') != -1) ret.replace('+'," ");
//   return ret; 
// }


process.stdin.on('data',function(buf){
var postData = {};
  ret = buf.toString();
  if(ret.indexOf('&')){
    ret.split('&').forEach(function(str){
      postData[str.split('=')[0]] = decodeURIComponent(str.split('=')[1]);
    })
  }
  var html =`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PostTest11</title>
  </head>
  <body>`;
  for (const key in postData) {
    html += `<p>${key} : ${postData[key]}<p><br>`;
  }
  html += `</body>
  </html>`;

  console.log('Content-Type: text/html');
  console.log('Content-Length: '+Buffer.from(html).length);
  console.log('');
  process.stdout.write(Buffer.from(html));
  process.exit();
});

