var x;
var y = 1;
var d = 100;
// for(var i = 0; i<5 ; i++){
//   final();
// }
final();
function checkRoadR(obj){
  var nowX = obj.x;  
  var nowY = obj.y; 
  var stateXY = `.cell${nowY}x${nowX}`;
  var stateN = `.cell${nowY-1}x${nowX}`;
  var stateE = `.cell${nowY}x${nowX+1}`;
  var stateS = `.cell${nowY+1}x${nowX}`;
  if( makeIt(stateN).classList.contains('notVisited') &&
      makeIt(stateXY).classList.contains('visited') &&
      makeIt(stateE).classList.contains('notVisited') &&
      makeIt(stateS).classList.contains('notVisited')){
      document.querySelector(stateXY).classList.add('notVisited');
      document.querySelector(stateXY).classList.remove('visited');
      var newObj = {x:--nowX,y:nowY}; 
      return party(newObj);
    }
}
function checkRoadT(obj){
  var nowX = obj.x;  
  var nowY = obj.y; 

  var stateXY = `.cell${nowY}x${nowX}`;
  var stateN = `.cell${nowY-1}x${nowX}`;
  var stateE = `.cell${nowY}x${nowX+1}`;
  var stateW = `.cell${nowY}x${nowX-1}`;
  if( makeIt(stateN).classList.contains('notVisited') &&
      makeIt(stateXY).classList.contains('visited') &&
      makeIt(stateE).classList.contains('notVisited') &&
      makeIt(stateW).classList.contains('notVisited')){
      document.querySelector(stateXY).classList.add('notVisited');
      document.querySelector(stateXY).classList.remove('visited');
      var newObj = {x:nowX,y:++nowY}; 
      return party(newObj);
    }
}

function checkRoadL(obj){
  var nowX = obj.x;  
  var nowY = obj.y; 

  var stateXY = `.cell${nowY}x${nowX}`;
  var stateN = `.cell${nowY-1}x${nowX}`;
  var stateS = `.cell${nowY+1}x${nowX}`;
  var stateW = `.cell${nowY}x${nowX-1}`;
  if( makeIt(stateN).classList.contains('notVisited') &&
      makeIt(stateXY).classList.contains('visited') &&
      makeIt(stateS).classList.contains('notVisited') &&
      makeIt(stateW).classList.contains('notVisited')){
      document.querySelector(stateXY).classList.add('notVisited');
      document.querySelector(stateXY).classList.remove('visited');
      var newObj = {x:++nowX,y:nowY}; 
      return party(newObj);
    }
}
function checkRoadB(obj){
  var nowX = obj.x;  
  var nowY = obj.y; 

  var stateXY = `.cell${nowY}x${nowX}`;
  var stateE = `.cell${nowY}x${nowX+1}`;
  var stateS = `.cell${nowY+1}x${nowX}`;
  var stateW = `.cell${nowY}x${nowX-1}`;
  if( makeIt(stateE).classList.contains('notVisited') &&
      makeIt(stateXY).classList.contains('visited') &&
      makeIt(stateS).classList.contains('notVisited') &&
      makeIt(stateW).classList.contains('notVisited')){
      document.querySelector(stateXY).classList.add('notVisited');
      document.querySelector(stateXY).classList.remove('visited');
      var newObj = {x:nowX,y:--nowY}; 
      return party(newObj);
    }
}



function makeIt(x) {
  return document.querySelector(x);
}

function final() {
 
  y=1;
 
  for(var i=1; i < 50;i++){
    x=1;
    
    for(var j=1; j< 50; j++){
      var stateNow = `.cell${y}x${x}`;
      if(stateNow){
        if (stateNow.indexOf('x') == 6){
          yCount = 1;
          xStart = 7;
        }
        else if(stateNow.indexOf('x') == 7){
          yCount = 2;
          xStart = 8;
        }
      }
      var a = parseInt(stateNow.slice(xStart));
      var b = parseInt(stateNow.substr(5,yCount));
      console.log(a,b);
      var obJ = {x:a,y:b};
      checkRoadR(obJ);
      checkRoadL(obJ);
      checkRoadB(obJ);
      checkRoadT(obJ);
      x++;
    }
  y++;

  }

}

function party(x) {
  checkRoadB(x);
  checkRoadT(x);
  checkRoadL(x);
  checkRoadR(x);
}