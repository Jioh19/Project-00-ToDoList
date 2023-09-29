const putTask = document.querySelector("#puttask");
const addTaskButton = document.querySelector("#addtask");
const taskList = document.querySelector("#tasklist");

 // Cargar tareas almacenadas en el localStorage al cargar la página
 window.onload = loadTasks;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';
    tasks.forEach(task => {
    addTaskToList(task);
    });
}

function addTask(e) {
    e.preventDefault();
    const taskText = putTask.value.trim();
    if (taskText) {
        addTaskToList(taskText);
        saveTasksToLocalStorage(taskText);
        putTask.value = "";
        }
}

function addTaskToList(taskText) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('elementList');
    taskItem.textContent = taskText;

    const deleteButton = document.createElement('i');
    deleteButton.classList.add('bx', 'bxs-trash');
    deleteButton.addEventListener('click', () => {
        deleteTask(taskText);
        });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

function saveTasksToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    loadTasks(); // Recargar la lista de tareas después de eliminar una tarea
}

addTaskButton.addEventListener("click", addTask);

taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("bxs-trash")) {
        e.target.parentElement.remove();
        deleteTask(e.target.parentElement.textContent);
        }
});