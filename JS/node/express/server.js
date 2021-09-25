var express = require('express');
var fs = require('fs');
var multer = require('multer');
var uploadMW = multer({
  dest: 'upload'
});


var server = express();

server.use( express.static('static'));
server.use( express.urlencoded());
server.set('view engine', 'ejs');
server.set('views',__dirname + '/ejs');


server.get('/',function(req,res,next){
  res.sendFile('/static/index.html');
})




server.post('/write',uploadMW.single('attach'), function(req,res,next){
  var articles = JSON.parse(fs.readFileSync('article.json').toString());
  if(req.file){
    articles.unshift({subject: req.body.subject, content: req.body.content, fileOriginName: req.file.originalname, filePsy: req.file.filename});
  } else {
    articles.unshift({subject: req.body.subject, content: req.body.content});
  }
  fs.writeFileSync('article.json', Buffer.from(JSON.stringify(articles)));
  res.redirect('/list?page=1');
})

server.get('/list',function(req,res,next){
    var pageNum = parseInt(req.query.page);
    // articles JSON 을 가져옴
    var articles = JSON.parse(fs.readFileSync('article.json').toString());
    // articles의 총 개수를 구함
    var length = articles.length;
    // 한 페이지당 5개씩 표현할 것이기 때문에 
    // 만약 게시물이 총 6개일 경우 2페이지를 나타내기 위해 올림을 하여 표현
    var max = Math.ceil(length/5);
    // 배열을 하나 만들고
    var arr = [];
    // 그 배열 안에 추가할 배열을 만든다
    var arrco = [];
    // 총 articles 개수만큼 반복을 하고
    for(var i=0; i<length; i++){
      // 배열에 5개씩 추가
      arrco.push(articles[i]);
      if((i+1)%5 == 0) {
        arr.push(arrco);
        // 추가하고 초기화
        arrco = [];
      }
    }
    // 마지막 배열에 남아있는 것까지 추가
    // 이렇게 되면 arr이라는 배열에 5개씩 articles가 담겨 있음
    // 마지막에는 5개 미만
    arr.push(arrco);
    // 페이지가 1 ~ 5일경우 목록에는 1 2 3 4 5가 출력이 되어야하므로
    // 1 ~ 5 일경우는 1 
    // 6 ~ 10 일경우는 6 ... 이렇게 표현하여 list.ejs 에서 반복문을 돌려 표현
    var pageStart = (parseInt((pageNum-1)/5)*5)+1;
    // 자료를 넘겨주고 -------> list.ejs 
    // -1 해주는 이유는 page는 1번부터 시작하지만
    // 배열의 index는 0번부터 시작하기 때문에 
  res.render('list.ejs',  {arr: arr[pageNum-1], num: (pageNum-1)*5, pageStart, max});
})

server.get('/read',function(req,res,next){
  var articles = JSON.parse(fs.readFileSync('article.json').toString());
  var num = req.query.index;
  var pageNum = Math.ceil(num / 5);
  // 0번 게시물일 경우 1번으로 가야하기 때문에 
  if(pageNum == 0) pageNum = 1;
  res.render('read', {article: articles[num], pageNum, num});
})

server.get('/download',function(req,res,next){
  var num = parseInt(req.query.index);
  var articles = JSON.parse(fs.readFileSync('article.json').toString());
  
  res.attachment(articles[num].fileOriginName);
  res.sendFile(__dirname + '/upload/'+articles[num].filePsy)
})

server.use(function(req, res, next){
  res.statusCode = 404;
  res.send('<h1>404 FILE NOT FOUNDED</h1>');
})

server.listen(4000, function(error){
  console.log('webserver is listening on port 4000!');
  if(error) 
  console.log('gg');
});