import { useState } from "react";
import ToDoElement from "./ToDoElement"

let nextId = 0;

const ToDoList = () => {

    
    const [todos, setTodos] = useState([]);
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
            <h1>LISTA DE TAREAS</h1>
            <div className="newToDoField">
                <input type='text' onChange={(e) => setDescriptionToDo(e.target.value)}></input>
                <button onClick={() => addToDo()}>Agregar tarea</button>
            </div>
            <div className="todos">
                {todos.map((a, key) => {
                    return( <ToDoElement deleteToDo={deleteToDo} key={key} id={a.id} description={a.description + a.id} /> )
                })}
            </div>
        </div>
    )
}

export default ToDoList;