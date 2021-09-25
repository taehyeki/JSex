var maze = document.querySelector('#maze');
var table = document.querySelector('#mazeTable');
var start = 0;
var end = 51;
var direcArr = [];
var yCount = 0;
var xStart = 0;

for(var y = 0; y < end; y++){
  var tableTr = document.createElement('tr');
  for(var x = 0; x < end; x++){
    var tableTd = document.createElement('td');
    tableTd.className = `cell${y}x${x}`;
    tableTd.classList.add('notVisited');
    tableTr.appendChild(tableTd);
  }
  table.appendChild(tableTr);
}
var entrance = document.querySelector('.cell1x0');
entrance.classList.add('visited');
entrance.classList.remove('notVisited');

var exit = document.querySelector(`.cell${end-2}x${end-1}`);
exit.classList.add('visited');
exit.classList.remove('notVisited');

while(1){
  var ranX = Math.floor(Math.random()*end);
  if(ranX %2 != 0)
    break;
}
while(1){
  var ranY = Math.floor(Math.random()*end);
  if(ranY %2 != 0)
    break;
}
var basicCell = document.querySelector(`.cell${ranY}x${ranX}`);
basicCell.classList.remove('notVisted');
basicCell.classList.add('visited');

class Stack {
  constructor(){
    this.array = [];
  }
  push(e) {
    return this.array.push(e);
  }
  pop() {
    return this.array.pop();
  }
  peek(){
    return this.array[this.array.length - 1];
  }
}

var st = new Stack;
st.push(`.cell${ranY}x${ranX}`);
function createMaze(cell) {
  if(cell.array[0]){
    if (cell.peek().indexOf('x') == 6){
      yCount = 1;
      xStart = 7;
    }
    else if(cell.peek().indexOf('x') == 7){
      yCount = 2;
      xStart = 8;
    }
    var x = parseInt(cell.peek().slice(xStart));
    var y = parseInt(cell.peek().substr(5,yCount));
  }
  st.pop();
  if(y && x){
    var obj = {  xside: x, yside : y};
    direcArr = canIGo(obj);
    var ran = Math.floor((Math.random()*direcArr.length));
    switch(direcArr[ran]){
      case 'up':
        removeClass(`.cell${y-1}x${x}`);
        removeClass(`.cell${y-2}x${x}`);
        addClass(`.cell${y-1}x${x}`);
        addClass(`.cell${y-2}x${x}`);
        st.push(`.cell${y}x${x}`);
        st.push(`.cell${y-2}x${x}`);
        direcArr.splice(ran, 1);
        break;
      case 'down':
        removeClass(`.cell${y+1}x${x}`);
        removeClass(`.cell${y+2}x${x}`);
        addClass(`.cell${y+1}x${x}`);
        addClass(`.cell${y+2}x${x}`);
        st.push(`.cell${y}x${x}`);
        st.push(`.cell${y+2}x${x}`);   
        direcArr.splice(ran, 1);
        break;
      case 'left':
        removeClass(`.cell${y}x${x-1}`);
        removeClass(`.cell${y}x${x-2}`);
        addClass(`.cell${y}x${x-1}`);
        addClass(`.cell${y}x${x-2}`);
        st.push(`.cell${y}x${x}`);
        st.push(`.cell${y}x${x-2}`);
        direcArr.splice(ran, 1);
        break;
      case 'right':
        removeClass(`.cell${y}x${x+1}`);
        removeClass(`.cell${y}x${x+2}`);
        addClass(`.cell${y}x${x+1}`);
        addClass(`.cell${y}x${x+2}`);
        st.push(`.cell${y}x${x}`);
        st.push(`.cell${y}x${x+2}`);
        direcArr.splice(ran, 1);
        break;
      default:  
    }
    createMaze(st);
  }
}

function canIGo(obj) {
  y = parseInt(obj.yside);
  x = parseInt(obj.xside);
  var canGoarr = [];
    if((document.querySelector(`.cell${y-2}x${x}`) && isItOkay(`.cell${y-1}x${x}`) && isItOkay(`.cell${y-2}x${x}`)) 
    && (y-1 != 0 && y -2 != 0)){
      canGoarr.push('up');
    }
    if((document.querySelector(`.cell${y+2}x${x}`) && isItOkay(`.cell${y+1}x${x}`) && isItOkay(`.cell${y+2}x${x}`)) 
    && (y+1 != (end -1) && y+2 != (end -1))){
      canGoarr.push('down');
    }
    if((document.querySelector(`.cell${y}x${x-2}`) && isItOkay(`.cell${y}x${x-1}`) && isItOkay(`.cell${y}x${x-2}`))
    && (x-1 != 0 && x -2 != 0)){
      canGoarr.push('left');
    }
    if((document.querySelector(`.cell${y}x${x+2}`) && isItOkay(`.cell${y}x${x+1}`) && isItOkay(`.cell${y}x${x+2}`)) 
    && (x+1 != (end -1) && x+2 != (end -1))){
      canGoarr.push('right');
    }
  return canGoarr;
}

createMaze(st);
function isItOkay(x) {
  var doc = document.querySelector(x).classList.contains('notVisited');
  return doc;
} 
function removeClass(x) {
  document.querySelector(x).classList.remove('notVisited');
}
function addClass(x) {
  document.querySelector(x).classList.add('visited');
}