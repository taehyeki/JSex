
var min = 0;
var max = 4;
Dbody = document.querySelector('body');
con = document.querySelector('.container')
var arr = [ // 4 X 4 배열
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
]
function randomPlaceX () {
  var X =Math.floor((Math.random() * max));
  return X;
}
function randomPlaceY () {
  var Y =Math.floor((Math.random() * max));
  return Y;
}


function makeSquare (value = 1) {
  while(1) {
    var x = randomPlaceX() ;
    var y = randomPlaceY() ;
    if(arr[y][x] === 0)
    {
      arr[y][x] = value * 2;  //랜덤 수를 생성하여 빈 자리가 나올때 까지 반복 
      break;
    }
 }
}


function moveTop () {
  for (var x = 0; x <= 3; x++){
    var array = [];
    for(var i = 0 ; i <= 3 ; i++) if(arr[i][x] !== 0) array.push(arr[i][x]);
    var idx = array.length;
    for (var j = 1; j <= idx -1 ; j++){
      if( array[j-1] == array[j]) {
        array[j-1] = array[j-1] * 2;
        array.splice(j,1);
      } 
    }
    for (var j = 0; j <= 3 ; j++) arr[j][x] = 0;
    idx = array.length;
    for (var j = 0; j < idx ; j++) arr[j][x] = array[j];
  }
}

function moveLeft () {
  for (var y = 0; y <= 3; y++){
    var array = [];
    for(var i = 0 ; i <= 3 ; i++) if(arr[y][i] !== 0) array.push(arr[y][i]);
    var idx = array.length;
    for (var j = 1; j <= idx -1 ; j++){
      if( array[j-1] == array[j]) {
        array[j-1] = array[j-1] * 2;
        array.splice(j,1);
      } 
    }
    for (var j = 0; j <= 3 ; j++) arr[y][j] = 0;
    idx = array.length;
    for (var j = 0; j < idx ; j++) arr[y][j] = array[j];
  }
}

function moveBottom () {
  for (var x = 0; x <= 3; x++){ // 배열의 세로열의 행번호 x 
    var array = [];
    for(var i = 3 ; 0 <= i  ; i--) { // 배열을 이동시키기 위해서 i를 설정 
      if(arr[i][x] !== 0) array.push(arr[i][x]); // 0이 아니면 빈 배열에 집어 넣음 
    }
    var idx = array.length;
    for (var j = 1; j <= idx -1 ; j++)
    {
      if( array[j-1] == array[j]) {  //근접한 배열요소와 비교를 통해 같은 값이면 *2
        array[j-1] = array[j-1] * 2;
        array.splice(j,1); // 합쳐지면 그 배열요소 삭제
      } 
    }
    for (var j = 0; j <= 3 ; j++) {
      arr[j][x] = 0; // 차례로 집어 넣고 남은 자리에는 0을 집어 넣기 위해서 0으로 초기화
    }
    num = 3 - (array.length - 1); //  Bottom Right는 Left Top과 다르게 역순으로 배치해줘야하기때문에
    var j = 0;                    //  뒤에서 부터 하나씩 차례로 집어넣음
    for(var i = 3 ; num <= i  ; i--) {
      arr[i][x]  = array[j];
      j++;    
    }
}
}

function moveRight () {
  
  for (var y = 0; y <= 3; y++){
    var array = [];
    for(var i = 3 ; 0 <= i  ; i--) if(arr[y][i] !== 0) array.push(arr[y][i]);
    var idx = array.length;
    for (var j = 1; j <= idx -1 ; j++){
      if( array[j-1] == array[j]) {
        array[j-1] = array[j-1] * 2;
        array.splice(j,1);
      } 
    }
    for (var j = 0; j <= 3 ; j++) arr[y][j] = 0;
    num = 3 - (array.length - 1);
    var j = 0;
    for(var i = 3 ; num <= i  ; i--) {
      arr[y][i]  = array[j];
      j++;
    }
}
}
// }
// function moveLeft (square) {
  
//   switch (parseInt(square.style.left.replace('px',''))-400) {    
//     case 0:
//       return 400 ;
//     case -100:
//       return 300;
//     case -200:
//       return 200;
//     case -300:
//       return 100;
//     case -400:
//       return 0;
// }

// }
// function moveRight (square) {
//   switch (parseInt(square.style.left.replace('px',''))-400) {    
//     case 0:
//       return 0;
//     case -100:
//       return 100;
//     case -200:
//       return 200;
//     case -300:
//       return 300;
//     case -400:
//       return 400;
// }

// }
// function moveBottom (square) {
//   switch (parseInt(square.style.top.replace('px',''))-400) {    
//     case 0:
//       return 0;
//     case -100:
//       return 100;
//     case -200:
//       return 200;
//     case -300:
//       return 300;
//     case -400:
//       return 400;
// }

// }
// function moveTop (square) {
//   switch (parseInt(square.style.top.replace('px',''))-400) {    
//     case 0:
//       return 400;
//     case -100:
//       return 300;
//     case -200:
//       return 200;
//     case -300:
//       return 100;
//     case -400:
//       return 0;
// }
// }


document.addEventListener('keydown',function(ev) {
  if (ev.keyCode === 37 ) moveLeft();
  else if (ev.keyCode === 38 ) moveTop();
  else if (ev.keyCode === 39 ) moveRight();
  else if (ev.keyCode === 40 ) moveBottom();
  else
    throw Error('잘못된 키를 누르셨습니다');
  makeSquare();
  create();
  console.log(arr);
  for(var i = 0; i <= 3; i++){
    for(var j = 0; j <= 3; j++){
      if ( (arr[i][j]) == 2048) console.log('mission complete');
    }
  }
  }
)

function create() {
  var NodeArr = document.querySelectorAll('.box')
  var number = NodeArr.length;
  console.log(NodeArr);
  for (var i = 0; i <= number-1;i++){
    NodeArr[i].remove();
  }
  for(var i = 0; i <= 3; i++){
    for(var j = 0; j <= 3; j++){
     
      if  (arr[i][j] != 0){
        var d1 = document.createElement('div');
        con.appendChild(d1);
        d1.classList.add('box');
        d1.classList.add(`Grade${arr[i][j]}`);
        d1.innerText = arr[i][j];
        d1.style.left = (`${(j) * 100}px`);
        d1.style.top = (`${(i) * 100}px`);
      } 
    }
  }
  
}

function init() {
  makeSquare();
  makeSquare();
  console.log(arr);
}

init();
