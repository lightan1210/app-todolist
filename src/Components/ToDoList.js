import { Fragment, useRef, useState } from "react";
import ToDoElement from "./ToDoElement"
import HolderSpace from "./HolderSpace";

let nextId = 0;

const initialToDos = [{id:nextId++, description:"Mollit do in anim anim exercitation dolor in sint velit eu cillum ut consequat excepteur. Excepteur Lorem ut proident aute qui amet sit cillum velit exercitation voluptate fugiat. Nulla commodo laboris ullamco exercitation dolore fugiat. Quis proident ad occaecat consectetur ut enim adipisicing cupidatat eu culpa aute nisi. Labore nisi dolor commodo nostrud proident dolore laboris ex anim id irure. Sunt consectetur enim ipsum sunt ut qui enim ea aliquip incididunt. Ex ex duis quis dolore labore amet Lorem."}];

const ToDoList = () => {
    
    const [todos, setTodos] = useState(initialToDos);
    const [descriptionToDo, setDescriptionToDo] = useState('');
    const [activeElement, setActiveElement] = useState(null);

    const inputDescriptionToDoElement = useRef();
    let allHolders = document.querySelectorAll(".invisibleHolderSpace");
    
    const addToDo = () => {

        if(descriptionToDo) {
            setTodos([...todos, {id:nextId++, description:descriptionToDo}]);
            inputDescriptionToDoElement.current.value = '';
            setDescriptionToDo(inputDescriptionToDoElement.current.value);
            inputDescriptionToDoElement.current.focus();
        }
        else
            console.log("Falta describir la tarea a realizar");
    }

    function deleteToDo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const onDrop = (position) => {
        if(activeElement == null || activeElement == undefined) return;

        const elementToMove = todos[activeElement];

        const updatedTodos = todos.filter((_, index) => index !== activeElement);

        updatedTodos.splice(position, 0, elementToMove);

        setTodos(updatedTodos);

        allHolders = document.querySelectorAll(".minimumHolderSpace");
        [...allHolders].forEach(holder => {
            holder.classList.add('invisibleHolderSpace');
            holder.classList.remove('minimumHolderSpace');
        })
    }

    const showHolderSpaces = () => {
        allHolders = document.querySelectorAll(".invisibleHolderSpace");
        [...allHolders].forEach(holder => {
            holder.classList.remove('invisibleHolderSpace');
            holder.classList.add('minimumHolderSpace');
        })
    }

    return (
        <div className="toDoList">
            <div className="newToDoField">
                <input ref={inputDescriptionToDoElement} type='text' onChange={(e) => setDescriptionToDo(e.target.value)}></input>
                <button onClick={() => addToDo()}>Agregar tarea</button>
            </div>
            <h1>LISTA DE TAREAS</h1>

            <div className="todos">
                <HolderSpace onDrop={() => onDrop(0)} />
                {todos.map((a, key) => {
                    return( 
                        <Fragment key={a.id} >
                            <ToDoElement deleteToDo={deleteToDo} id={a.id} description={a.description} index={key} setActiveElement={setActiveElement} showHolderSpaces={showHolderSpaces}/>
                            <HolderSpace onDrop={() => onDrop(key+1)} />
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default ToDoList;