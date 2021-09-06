
// Note Actions

//Adding new note
const addNoteBtn = document.getElementById('add-note');

addNoteBtn.addEventListener('click', () => {
    addNote();
});


function addNote(){
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        
            <div class="tools">
                <button class="edit" id="edit">
                    <i class="fas fa-edit"></i>
                    </button>
                <button class="delect" id="delect">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="main-note hidden" id="main-note"></div>
            <textarea class="text-area" id="text-area"></textarea>
       

    `
    const editBtb = note.querySelector(".edit");
    const delectBtb = note.querySelector(".delect");
    

    const main = note.querySelector('.main-note');
    const textArea = note.querySelector('.text-area');


    editBtb.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden')
    
    });
    
    textArea.addEventListener('input', (e) => {
        const {value} = e.target;
        
        main.innerHTML = marked(value);
    });
    
    delectBtb.addEventListener('click', () => {
        note.remove();
    });

    document.body.appendChild(note);
    
};


function noteValueLS(){
    const noteText = document.querySelectorAll('.text-area')

    const notes = [];

    noteText.forEach(note => {
        notes.push(note.value)
    });

    localStorage.setItem('note', JSON.stringify(note));
};


//Todo Actions

const form  = document.getElementById('form') ;
const input = document.getElementById('input') ;

const todosUl= document.getElementById('todos');


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
            todoLst.classList.add('completed');
         
        }

        todoLst.innerText = todoText;

        todoLst.addEventListener('click',() => {

            todoLst.classList.toggle('completed')
            tododValueLS();

        } );
        todoLst.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoLst.remove();
            
        });

        todosUl.appendChild(todoLst)
        
        input.value = '';


        todoValueLS();
       }
    
}

function todoValueLS(){

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





