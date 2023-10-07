//first time showtask calling
showTasks();
let taskInput = document.getElementById('taskInput');
let addTask = document.getElementById('addTask');
let saveTask = document.getElementById('saveTask');
addTask.addEventListener('click', addTaskFun);
taskInput.addEventListener('keypress', addTaskOnEnter);
let deleteAllTask = document.getElementById('deleteAllTask');

//AddTask functionality method 1
function addTaskOnEnter(e) {
    if (e.key == 'Enter') {
        addTaskFun();
    }
}

//AddTask functionality method 2
function addTaskFun(e) {
    let task = taskInput.value;
    let localTasks = localStorage.getItem("tasks");
    if (task.trim().length !== 0) {
        if (localTasks == '') {
            tasks = [];
        } else {
            tasks = JSON.parse(localTasks);
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    taskInput.value = ''
    showTasks();
}

//ShowTask functionality
function showTasks() {
    let taskList = document.getElementById('task-list')
    let localTasks = localStorage.getItem("tasks");
    if (localTasks == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localTasks);
    }

    if (localTasks.length == 2) {
        deleteAllTask.style.display = 'none'
    } else {
        deleteAllTask.style.display = 'inline-block'
    }

    let html = ''
    tasks.forEach((item, index) => {
        html += `<li class="task" id='${index + 1}'> ${index + 1})  <span class="taskItem">${item}</span> <span class="editTask"><i class="fa-regular fa-pen-to-square" id='${index}' onclick='editTask(${index})'></i></span><span
                       class="deleteTask" > <i class="fa-solid fa-trash" id='${index}' onclick='deleteTask(${index})'></i></span></li>`
    });
    taskList.innerHTML = html;
}

let allTask = document.querySelectorAll('.editTask')
function editTask(index) {
    saveTask.style.display = 'inline-block';
    addTask.style.display = 'none';
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    taskInput.value = tasks[index];
    editIndex = index;
}

function saveTaskFun() {
    let tasks = JSON.parse(localStorage.getItem("tasks"))
    tasks.splice(editIndex, 1, taskInput.value)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    taskInput.value = ''
    showTasks()
    saveTask.style.display = 'none'
    addTask.style.display = 'inline-block'
}

//DeletTask functionality
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"))
    tasks.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    showTasks()
}

//Delet All Task functionality
deleteAllTask.addEventListener('click',
    function deleteAllTask() {
        let tasks = JSON.parse(localStorage.getItem("tasks"))
        tasks.splice(0)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        console.log(tasks)
        showTasks()
    })