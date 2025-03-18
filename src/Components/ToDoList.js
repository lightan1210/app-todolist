import { useState } from "react";
import ToDoElement from "./ToDoElement"

let nextId = 0;

const ToDoList = () => {

    const initialToDos = [{id:nextId, description:"Cillum labore laborum pariatur anim dolore fugiat nostrud culpa cillum Lorem commodo ad excepteur nulla. Velit excepteur ut excepteur nulla ut deserunt quis. Qui tempor consequat non incididunt irure minim minim. Exercitation esse fugiat Lorem dolore irure est aliqua anim Lorem veniam elit. Deserunt sint voluptate dolore consequat dolore qui nostrud ut."}];
    
    const [todos, setTodos] = useState(initialToDos);
    const [descriptionToDo, setDescriptionToDo] = useState('');
    
    const addToDo = () => {

        setTodos([...todos, {id:nextId, description:descriptionToDo}]);
        nextId++;
    }

    function deleteToDo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
        <div className="toDoList">
            <div className="newToDoField">
                <input type='text' onChange={(e) => setDescriptionToDo(e.target.value)}></input>
                <button onClick={() => addToDo()}>Agregar tarea</button>
            </div>
            <h1>LISTA DE TAREAS</h1>
            <div className="todos">
                {todos.map((a, key) => {
                    return( <ToDoElement deleteToDo={deleteToDo} key={key} id={a.id} description={a.description + a.id} /> )
                })}
            </div>
        </div>
    )
}

export default ToDoList;