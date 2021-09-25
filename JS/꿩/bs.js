var direction = '';
var food ={};
var gameSet;
var snake1;
for(var i = 0; i < 20; i++){
  $('.board').append('<tr id='+ '"'+ i + '"' +'></tr>');
  for(var j =0; j < 20; j++)
    $('.board').find('#'+i).append('<td class='+ '"'+ j + '"' +'></td>');
}


  window.addEventListener('keydown', function(ev) {
    if(ev.keyCode == 37)
      direction = 'left'; 
    if(ev.keyCode == 38)
      direction = 'up'; 
    if(ev.keyCode == 39)
      direction = 'right'; 
    if(ev.keyCode == 40)
      direction = 'down'; 
  })
  class Snake {
    constructor(len){
      this.snake = [];
      for(var i = len; i >=0; i--){
        this.snake.push({x:i,y:0});
        $('#'+ 0).find("."+i).css({backgroundColor:'black'});
      }
    }
    newPos(){
      var posX = this.snake[0].x;   
      var posY = this.snake[0].y;   
      switch(direction){
        case ('left'):
          posX--;
          if(posX < 0){
            posX = 19;
          }
          break;
        case ('right'):
          posX++;
          posX %= 20;
          break;
        case ('up'):
          posY--;
          if(posY < 0){
            posY = 19;
          }
          break;
        case ('down'):
          posY++;
          posY %= 20;
          break;          
      }
     
      if (isItOkay(posX,posY,this.snake)){
        stopIt();
        console.log('3');
      }
      this.snake.unshift({x:posX,y:posY});
      $('#'+posY ).find("."+posX).css({backgroundColor:'black'});
      if(eatingFood(posX,posY))
        makeFood();
      else{
        var a = this.snake[(this.snake).length - 1].x;
        var b = this.snake[(this.snake).length-1].y;
        $('#'+b).find('.'+a).css({backgroundColor:'white'})
        this.snake.pop();
      }
    }
  }
    function start() {
      direction = 'down';
      snake1 = new Snake(3);
     
      makeFood();
      gameSet = setInterval(function() {
        update();
        console.log('1');
      },100)
    }
    function update() {
      snake1.newPos();
    
    }
    function stopIt() {
      clearInterval(gameSet);
    }
    
  function isItOkay(posX, poxY, array) {
    for(var i = 0; i < array.length; i++ ){
      if(posX == array[i].x && poxY == array[i].y)
        return true;
    }
    return false;
  }

  function eatingFood(posX,posY) {
    if(posX == food.x && posY == food.y){
      console.log(food.x,food.y);
      food.x ="";
      food.y ="";
      
      return true;
    }
    return false;
  }

  function makeFood() {
    do{
    food.x = Math.floor(Math.random()*20);
    food.y = Math.floor(Math.random()*20);
    }while(isItOkay(food.x,food.y, snake1.snake));
    $('#'+food.y).find('.'+food.x).css({backgroundColor:'red'})
    console.log(food.x,food.y);
  }


  
  start();


