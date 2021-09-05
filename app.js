const form  = document.getElementById('form') ;
const input = document.getElementById('input') ;

const todoEl = document.getElementById('todos')


const todos = JSON.parse(localStorage.getItem('todos'));

if(todos){
    todos.forEach(todo => {
        
       addTodo();
    }); 
};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
    
});

function addTodo(todo){
    let todoText = input.value;
    if(todo){
        todoText = todo.text

    
    }
    

    if(todoText){
        
        const todoLst = document.createElement("li");

        if(todo && todo.completed){
            todoLst.classList.add('completed')
        }
        
        
        todoLst.innerText = todoText;
        todoLst.addEventListener('click',() => {

            todoLst.classList.toggle('completed')
            updateLS();

        } );
        todoLst.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoLst.remove();
            
        });

        todoEl.appendChild(todoLst)
        input.value = '';

        localStorage.getItem('todos', JSON.parse(todos)
        
        ) 

        updateLS();

    }

}

function updateLS(){

    const todosEl = document.querySelectorAll("li");
    
    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed:  todoEl.classList.contains("completed"),
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}