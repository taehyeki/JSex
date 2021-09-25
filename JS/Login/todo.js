const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

const TODOS_NAME = 'todos';
let todos = [];

todoForm.addEventListener('submit', function(ev){
  ev.preventDefault();
  const todoValue = todoInput.value;
  todoInput.value = '';
  const newTodoObj = { 
    id: ranId(),
    text : todoValue
   };
  todos.push(newTodoObj);
  todoPrint(newTodoObj);
  saveThem();
});


function todoPrint(newTodoObj) {
  const li = document.createElement('li');
  li.id = newTodoObj.id;
  const span = document.createElement('span');
  
  span.innerText = newTodoObj.text;
  
  li.appendChild(span);
  const button = document.createElement('button');
  button.addEventListener('click', del);
  button.innerText = 'X';
  li.appendChild(button);
  todoList.appendChild(li);
}

function saveThem() {
  localStorage.setItem(TODOS_NAME, JSON.stringify(todos));
}

function ranId() {
  const now = new Date;
  return now.getTime();
}

function del(ev){
  const a = ev.target.parentNode;
  a.remove();
  todos = todos.filter(function(item) {
    return item.id != a.id; 
  })
  saveThem();
}


if(localStorage.getItem(TODOS_NAME)) {
  todos = JSON.parse(localStorage.getItem(TODOS_NAME));
  todos.forEach(todoPrint);
}

