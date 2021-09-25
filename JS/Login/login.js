const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const h1 = document.querySelector('#greet');

const HIDDEN_CLASSNAME = 'hidden';
const USERNAME = 'username';

function greeting(username) {
  h1.innerText = `hello~! ${username}`;
  h1.classList.remove( HIDDEN_CLASSNAME);
}

const localUserName = localStorage.getItem(USERNAME);

if (localUserName) {
  greeting(localUserName)
}else {
  loginForm.classList.remove( HIDDEN_CLASSNAME);
  loginForm.addEventListener('submit', function(e){
  const loginId = loginInput.value;
  e.preventDefault();
  localStorage.setItem(USERNAME, loginId)
  loginForm.classList.add( HIDDEN_CLASSNAME);
  greeting(loginId);
});
}