const clock = document.querySelector('#clock');


function makeTwo(something) {
  if (something < 10) {
    return `0${something}`;
  }else{
    return something;
  }
}

setInterval(function() {
  
  const hours = new Date().getHours();
  const mins = new Date().getMinutes();
  const secs = new Date().getSeconds();

  clock.innerText = hours.toString().padStart(2,"0") + "시 " +  mins.toString().padStart(2,"0") + "분 " + secs.toString().padStart(2,"0") + "초";

},1000)