const currentDate = document.querySelector("#current-date");
const form = document.querySelector('#form');
const listItem = document.querySelector('#list-item');
const submit = document.querySelector('#submit');
const todoList = document.querySelector('#todo-list');
const reset = document.querySelector('#reset');

const setCurrentDate = () => {
    currentDate.textContent = new Date().toDateString();
}
setCurrentDate();

const savedListItems = localStorage.getItem('listItems');

if (savedListItems) {
    todoList.innerHTML = savedListItems;
}

const addListItem = (event) => {
    event.preventDefault();

    if (listItem.value.length > 1) {
        const li = document.createElement('li');
        const liContent = `<input type="checkbox" class="check" />
                            <p>${listItem.value}</p>
                            <i class="fas fa-trash-alt"></i>`;
        li.innerHTML = liContent;
        todoList.appendChild(li);
        listItem.value = '';

        localStorage.setItem('listItems', todoList.innerHTML);
    }
}

const todoListEvents = (event) => {
    const li = event.target.parentElement;

    if(event.target.classList.contains('check') && event.target.checked == true) {
        li.classList.add("crossed");
    }
    
    if (event.target.classList.contains('check') && event.target.checked == false) {
        li.classList.remove('crossed');
    }

    if(event.target.classList.contains('fas')) {
        if(confirm("This item will be deleted")) {
            todoList.removeChild(event.target.parentElement);
        } 
    }

    localStorage.setItem('listItems', todoList.innerHTML);
}

const resetTodo = () => {
    if(confirm("This will delete all items")) {
        todoList.innerHTML = '';
        localStorage.clear();
    }
}

form.addEventListener('submit', addListItem);
todoList.addEventListener('click', todoListEvents);
reset.addEventListener('click', resetTodo);
