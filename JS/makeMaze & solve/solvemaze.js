var start = document.querySelector('.cell1x0');

start.classList.add('present');

var WhatIsRightDirecNow = 'down';
var WhatIsMoveDirecNow = 'right';
var x;
var y;
startXY = '.cell1x0';
//move : right / rightdirec : down
//move : down / rightdirec : left;
//move : left / rightdirec : up;
//move : up / rightdirec : right;


function goFoward() {

  if(startXY){
    if (startXY.indexOf('x') == 6){
      yCount = 1;
      xStart = 7;
    }
    else if(startXY.indexOf('x') == 7){
      yCount = 2;
      xStart = 8;
    }
    x = parseInt(startXY.slice(xStart));
    y = parseInt(startXY.substr(5,yCount));
  }
  if(WhatIsMoveDirecNow == 'right'){
    if(document.querySelector(`.cell${y+1}x${x}`).classList.contains('visited')){
      start.classList.remove('present');
      start = document.querySelector(`.cell${y+1}x${x}`);
      startXY = `.cell${y+1}x${x}`;
      start.classList.add('present');
      WhatIsRightDirecNow = 'left';
      WhatIsMoveDirecNow = 'down';
    }
    else if(document.querySelector(`.cell${y}x${x+1}`).classList.contains('visited'))
    {
      start.classList.remove('present');
      start = document.querySelector(`.cell${y}x${x+1}`);
      startXY = `.cell${y}x${x+1}`;
      start.classList.add('present');
    }
    else if(document.querySelector(`.cell${y-1}x${x}`).classList.contains('visited'))
    {
      start.classList.remove('present');
      start = document.querySelector(`.cell${y-1}x${x}`);
      startXY = `.cell${y-1}x${x}`;
      start.classList.add('present');
      WhatIsRightDirecNow = 'right';
      WhatIsMoveDirecNow = 'up';
    }
    else {
      WhatIsMoveDirecNow = 'left';
      WhatIsRightDirecNow = 'up';
    }
    
  }

  else if(WhatIsMoveDirecNow == 'left'){
    if(document.querySelector(`.cell${y-1}x${x}`).classList.contains('visited')){
      start.classList.remove('present');
      start = document.querySelector(`.cell${y-1}x${x}`);
      startXY = `.cell${y-1}x${x}`;
      start.classList.add('present');
      WhatIsRightDirecNow = 'right';
      WhatIsMoveDirecNow = 'up';
    }
    else if(document.querySelector(`.cell${y}x${x-1}`).classList.contains('visited'))
    {
      start.classList.remove('present');
      start = document.querySelector(`.cell${y}x${x-1}`);
      startXY = `.cell${y}x${x-1}`;
      start.classList.add('present');
    }
    else if(document.querySelector(`.cell${y+1}x${x}`).classList.contains('visited'))
    {
      start.classList.remove('present');
      start = document.querySelector(`.cell${y+1}x${x}`);
      startXY = `.cell${y+1}x${x}`;
      start.classList.add('present');
      WhatIsRightDirecNow = 'left';
      WhatIsMoveDirecNow = 'down';
    }
    else {
      WhatIsMoveDirecNow = 'right';
      WhatIsRightDirecNow = 'down';
    }
    
  }

  else if(WhatIsMoveDirecNow == 'down'){
    if(document.querySelector(`.cell${y}x${x-1}`).classList.contains('visited')){
      start.classList.remove('present');
      start = document.querySelector(`.cell${y}x${x-1}`);
      startXY = `.cell${y}x${x-1}`;
      start.classList.add('present');
      WhatIsRightDirecNow = 'up';
      WhatIsMoveDirecNow = 'left';
    }
    else if(document.querySelector(`.cell${y+1}x${x}`).classList.contains('visited'))
    {
      start.classList.remove('present');
      start = document.querySelector(`.cell${y+1}x${x}`);
      startXY = `.cell${y+1}x${x}`;
      start.classList.add('present');
    }
    else if(document.querySelector(`.cell${y}x${x+1}`).classList.contains('visited'))
    {
      start.classList.remove('present');
      start = document.querySelector(`.cell${y}x${x+1}`);
      startXY = `.cell${y}x${x+1}`;
      start.classList.add('present');
      WhatIsRightDirecNow = 'down';
      WhatIsMoveDirecNow = 'right';
    }
    else {
      WhatIsMoveDirecNow = 'up';
      WhatIsRightDirecNow = 'right';
    }
    
  }
  
  else if(WhatIsMoveDirecNow == 'up'){
    if(document.querySelector(`.cell${y}x${x+1}`).classList.contains('visited')){
      start.classList.remove('present');
      start = document.querySelector(`.cell${y}x${x+1}`);
      startXY = `.cell${y}x${x+1}`;
      start.classList.add('present');
      WhatIsRightDirecNow = 'down';
      WhatIsMoveDirecNow = 'right';
    }
    else if(document.querySelector(`.cell${y-1}x${x}`).classList.contains('visited'))
    {
      start.classList.remove('present');
      start = document.querySelector(`.cell${y-1}x${x}`);
      startXY = `.cell${y-1}x${x}`;
      start.classList.add('present');
    }
    else if(document.querySelector(`.cell${y}x${x-1}`).classList.contains('visited'))
    {
      start.classList.remove('present');
      start = document.querySelector(`.cell${y}x${x-1}`);
      startXY = `.cell${y}x${x-1}`;
      start.classList.add('present');
      WhatIsRightDirecNow = 'up';
      WhatIsMoveDirecNow = 'left';
    }
    else {
      WhatIsMoveDirecNow = 'down';
      WhatIsRightDirecNow = 'left';
    }
    
  }
  check();
}

var game = setInterval(goFoward,50);

function check() {
  if(start.classList.contains('cell49x50'))
  {
    clearInterval(game);
  }
}