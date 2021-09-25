var dir = 'down'; 
var food = {};
var game;
var flag;
var board = document.querySelector('.board');
var score = 0;
$('.board').after('<div></div>');
var sb = $('div');
for(var i = 0; i <20 ; i++){
  
  var tr = document.createElement('tr');
  tr.id =i;
  for(var j = 0; j<20; j++){
    var td = document.createElement('td')
    td.classList.add(j);
    tr.appendChild(td);
  }
  
  board.appendChild(tr);
}


$(window).on('keydown', (ev) =>{
  if (ev.keyCode == 37){
    dir = 'left';
  }
  if (ev.keyCode == 38){
    dir = 'up';
  }
  if (ev.keyCode == 39){
    dir = 'right';
  }
  if (ev.keyCode == 40){
    dir = 'down';
  }
  console.log(dir);
});

class Snake {
  constructor(snakeLength){
    this.snake = [];
    for(var i = snakeLength; i >= 0; i--){
      this.snake.push({
        x : i,
        y : 0});
        $('#'+0).find("."+i).css({
          backgroundColor : 'black',
          border : '1px solid lightgray'
        })
    }
  

  }
  goAnd() {
    var posX = this.snake[0].x; 
    var posY = this.snake[0].y;
    $('#'+posY).find("."+posX).css({
      backgroundColor : 'black',
      border : '1px solid lightgray'
    })
    if(dir == 'left'){
      posX--;
      if(posX < 0)
        posX = 19;
    }
    else if(dir == 'right'){
      posX++;
      posX %= 20;
    }
    else if(dir == 'up'){
      posY--;
      if(posY < 0)
        posY = 19;
    }
    else if(dir == 'down'){
      posY++;
      posY %= 20;
    }
    if(isItOkay(posX,posY,this.snake))
        stopGame();
  
    this.snake.unshift({
      x : posX,
      y : posY
    });
    $('#'+posY).find("."+posX).css({
      backgroundColor : 'blue',
      border : '1px solid lightgray'
    })
    
    if (flag){
      flag--; 
      console.log(flag);
    }
    else {
      if(haveYouHad(posX,posY)){
        $('#'+food.y).find("."+food.x).text("");
        flag = food.z - 1;
        score += food.z;
        sb.text('Score: '+score);
        food.x = "";
        food.y = "";
        MakeFood(this.snake);
      }
      else {
        var lastLen = this.snake.length -1 ;
        var lastX = this.snake[lastLen].x; 
        var lastY = this.snake[lastLen].y; 
        $('#'+lastY).find("."+lastX).css({
          backgroundColor : '',
          border : ""
        })
        this.snake.pop();
      } 
    }
   
  }   
}

function isItOkay(posX, posY, snake) {
  for(var i=0; i < snake.length; i++){
    if(snake[i].x == posX && snake[i].y == posY)
      return true;
  }
  return false;
}

function stopGame() {
  clearInterval(game);
  $('.board').after('<p>GAME OVER</p>');
}
function MakeFood(snake) {
  do{
  var posX = Math.floor(Math.random()*20);
  var posY = Math.floor(Math.random()*20);
  var posZ = Math.floor(Math.random()*4)+1;
  }while(isItOkay(posX,posY,snake));
  food.x = posX;
  food.y = posY;
  food.z = posZ;
  $('#'+food.y).find("."+food.x).css({
    backgroundColor : 'red'
  }).text(food.z);
}
function haveYouHad(posX, posY) {
  if(posX == food.x && posY == food.y)
    return true;
}


function gameSet() {
  var snake = new Snake(3);
  MakeFood(snake);
  game = setInterval(function() {
    snake.goAnd();
  }, 200);
  
}
gameSet();
