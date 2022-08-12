
import { TaskService } from './../service/TaskService.js';
import { Validation } from "./../model/Validation.js";
import Task from './../model/Task.js';

const getEle = (id) => document.getElementById(id);

const service = new TaskService();
const validation = new Validation();

let toDo = [];

const getTaskList = () => {
    service.callApi("/Todo-List", "GET", null)
        .then(({ data }) => {
            toDo = data;
            renderTableTask(data);
            renderDoneTask(data);
        })
        .catch(error => {
            console.log(error)
        })
};

getTaskList();

const renderTableTask = (toDo) => {
    let html = toDo.filter(task => !task.done).reduce((contentHTML, task) => {
        return contentHTML += `
            <li>
                <p>${task.newTask}<p>
                <div class="buttons">
                    <button type="button" class="remove" data-toggle="modal" data-target="#exampleModal" onclick ="handleXoa(${task.id})">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button type="button" class="complete" onclick="completedTask(${task.id})">
                        <i class="fa fa-check-circle"></i>
                        
                    </button>
                </div>
            </li>
        `
    }, '')

    getEle("todo").innerHTML = html;
}

//Donetask
const renderDoneTask = (toDo) => {
    let html = toDo.filter(task => task.done).reduce((contentHTML, task) => {
        return contentHTML += `
            <li>
                <p>${task.newTask}</p>
                <div class="buttons">
                    <button type="button" class="remove" data-toggle="modal" data-target="#exampleModal" onclick ="handleXoa(${task.id})">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                    <button type="button" class="complete">
                        <i class="fa fa-check-circle btn-success"></i>

                    </button>
                
                </div>
            </li>
        `
    }, '')
    getEle("completed").innerHTML = html;
}



//Add New Task

const addTask = () => {
    //Validation
    const taskName = getEle("newTask").value

    let isValid = true;

    isValid &= validation.kiemTraRong(
        taskName,
        "errorTask",
        "Vui lòng nhập vào việc cần làm !"
    ) && validation.kiemTraTrung(
        taskName,
        "errorTask",
        "Việc làm đã tồn tại !",
        toDo
    ) && validation.kiemTraChu(
        taskName,
        "errorTask",
        "Vui lòng chỉ nhập chữ !"
    )

    if (isValid) {
        const task = new Task(taskName.toUpperCase(), false)
        service.callApi("/Todo-List", "POST", task)
            .then(() => {
                getTaskList();
                alert("Thêm việc thành công !");
                getEle("newTask").value = "";
            })
            .catch(error => {
                console.log(error)
            })
    }
}

window.addTask = addTask;

//Delete Task
const handleXoa = (id) => {
    service.callApi(`/Todo-List/${id}`, "DELETE", null)
        .then(() => {
            alert("Delete Success !");
            getTaskList()
        })
        .catch(error => {
            console.log(error)
        })
}
window.handleXoa = handleXoa;

//addTaskCompeleted
const completedTask = (id) => {
    let task = toDo.find(task => task.id == id)

    task = { ...task, done: true }

    service.callApi(`/Todo-List/${id}`, "PUT", task)
        .then(() => {
            alert("Add Task Completed !")
            getTaskList();
        })
        .catch(error => {
            console.log(error)
        })
}
window.completedTask = completedTask;

