

// for(var j = 2;j <= lastDay.getDate(); j++){
//   if (cnt <= startDay.getDay()) { // 첫날의 요일(6)을 구해서 요일보다 작으면 공백을 출력
//     i = vac + i;  // 조건문에 cnt++을 사용하면 조건에 맞지 않아도 실행되기에 따로 써줌
//     cnt++;
//     j--; // j--를 안해주면 continue를 통해 넘어간 후 j++가 이어지기에 숫자가 이상해짐
//     continue
//   }
  
//   if(cnt++ % 7 == 0) { // 어처피 cnt는 +1 이 되어야 하기때문에 cnt++ 사용함
//     i += '\n'+j; // 일주일이 지날때마다 계행을 적어줌
//     continue; 
//   }
//   i = i + ' ' + j;
//   if (j == lastDay.getDate() && lastDay.getDay() !== 6) // 마지막 날이고 마지막날이 토요일이 아니라면 공백을 추가입력
//   {
//    while(cnt++ % 7 != 0) {
//      i = i + vac;
//    } 
//   }
  
// }

// var i = '1'; 

var year = new Date().getFullYear();
var month = new Date().getMonth();

var makeTd = function (something, tr) {
  var td = document.createElement('td'); // 
  td.innerText = something;  
  tr.appendChild(td);
}

var preBtn = document.querySelector('.btn1');
preBtn.addEventListener('click', function() {
  month--;
  var table = document.querySelector('table');
  table.parentNode.removeChild(table);
  makeDate();
}) 

var nextBtn = document.querySelector('.btn2');
nextBtn.addEventListener('click', function() {
   month++;
  var table = document.querySelector('table');
  table.parentNode.removeChild(table);
  makeDate();
})

function makeDate () {
  
  var h1 = document.querySelector('h1');
  var lastDay = new Date(year, month+1, 0);
  var startDay = new Date(year, month, 1);
  var tb = document.createElement('table');
  var tr = document.createElement('tr');
  var cnt = 1; // 7일째마다 계행 주는 역할
  var vac  ='[]'; // 공백 역할

  h1.innerText = lastDay.getFullYear() + '년 ' + (lastDay.getMonth()+1) +'월 달력'; 
  var th = document.createElement('th');
  
  tb.appendChild(th);
  for(var day = 1; day <= lastDay.getDate(); day++){
    if (cnt <= startDay.getDay()) { // 첫날의 요일(6)을 구해서 요일보다 작으면 공백을 출력
      makeTd(vac, tr);
      cnt++; // 조건문에 cnt++을 사용하면 조건에 맞지 않아도 실행되기에 따로 써줌
      day--; // j--를 안해주면 continue를 통해 넘어간 후 j++가 이어지기에 숫자가 이상해짐
      continue;
    }
    makeTd(day, tr); // 공백이 지나면 날자를 적음
    if(cnt++ % 7 == 0) {
      tb.appendChild(tr); // 계행이 되면 tr을 tb에 넣고 새로운 tr생성
      var tr = document.createElement('tr');
    }

    if (day == lastDay.getDate() && lastDay.getDay() !== 6) // 마지막 날이고 마지막날이 토요일이 아니라면 공백을 추가입력
    {
      cnt--; //이미 앞서 cnt ++를 해주었기때문에 안해주면 한번 중복
      while (cnt++ % 7 != 0) makeTd(vac, tr);
      tb.appendChild(tr);
    }
  }
  var container  =document.getElementById('date');
  container.appendChild(tb);
}
makeDate();

var btn3 = document.querySelectorAll('td');
for( i = 0; i < btn3.length; i++) {
  btn3[i].addEventListener('click', function() {
    btn3[i].style.backgroundColor = 'yellow';
  })
}
console.log(btn3);
