// finding elements
let form=document.querySelector("#form");
let input=form.querySelector("#input");
let ul=document.querySelector(".list");
let p=document.querySelector("#message");

// functions
let getTodos=()=>{
    return localStorage.getItem("myTodos")?JSON.parse(localStorage.getItem("myTodos")):[];
}

let showMessage=(text, status)=>{
    p.innerHTML=text;
    p.classList.add(`bg-${status}`);
    setTimeout(()=>{
        p.textContent="";
        p.classList.remove(`bg-${status}`);
    },500);
}

let deleteTodo=(e)=>{
    let parent=e.target.parentElement.parentElement.parentElement;
    ul.removeChild(parent);
    showMessage("Todo is deleted","danger");
    //console.log(parent);
    let todos=getTodos();
    todos= todos.filter((todo)=>todo.todoID!==parent.id);
    localStorage.setItem("myTodos",JSON.stringify(todos));

}

let createTodo = (id,value)=>{
    let todoElement=document.createElement("li");
    todoElement.innerHTML=`
    <span> ${value} </span> <span> <button class="dbtn"><i class="fa-solid fa-trash"></i> </button> </span>`;
    todoElement.id=id;
    ul.appendChild(todoElement);
    input.value="";
    let deleteB=todoElement.querySelector(".dbtn");
    deleteB.addEventListener("click",deleteTodo);
}

let addTodo = (e)=>{
    e.preventDefault();

    // unique ID for todo
    let todoID=Date.now().toString();
    let todoValue=input.value;
    createTodo(todoID,todoValue);
    showMessage("todo is created","success");
    
    let todos = getTodos();
    todos.push({todoID,todoValue});
    localStorage.setItem("myTodos",JSON.stringify(todos));
};
let loadTodos=()=>{
    let todos=getTodos();
    todos.map((todo)=>{
        createTodo(todo.todoID, todo.todoValue);
    });

}

// adding event listeners
form.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded", loadTodos)


