const jsContainer = document.querySelector('.js-clock');
const jsH1 = jsContainer.querySelector('.js-title');
const jsForm = document.querySelector('.js-form');
const jsInput = jsForm.querySelector('input');
const jsH4 = document.querySelector('h4');

function getTime() {
  const t = new Date();
  const hour = t.getHours();
  const min = t.getMinutes();
  const sec = t.getSeconds();
  jsH1.innerHTML = `${hour < 10 ? `0`+ hour : hour}:${min < 10 ? '0'+min : min}:${sec < 10 ? '0'+sec : sec}`;
}
function init() {
  getTime();
  setInterval(getTime,1000);
}

init();

function eventPreventer(event){
  event.preventDefault();
  const IV =  jsInput.value
  localStorage.setItem(USER_LS, IV);
  greet(IV);
} 

function greet(IV){
  jsForm.classList.remove(Showing);
  jsH4.classList.add(Showing);
  jsH4.innerText = `wellcome ${IV}`;
}

function askForName() {
  jsForm.classList.add(Showing);
  jsForm.addEventListener('submit', eventPreventer);
}
const USER_LS = 'username';
const Showing = 'showing';
function ShowName() {
  const LocalName = localStorage.getItem(USER_LS);
  if (LocalName === null) {
    askForName();
  } else {
    
    jsForm.classList.remove(Showing);
    jsH4.classList.add(Showing);
    jsH4.innerText = `Wellcome ${LocalName}`;  
  }
}

ShowName();


 

