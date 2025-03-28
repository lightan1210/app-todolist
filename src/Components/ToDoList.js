import { Fragment, useRef, useState } from "react";
import ToDoElement from "./ToDoElement"
import HolderSpace from "./HolderSpace";

let nextId = 0;

const initialToDos = [{id:nextId++, description:"Lorem duis mollit Lorem aliquip ea laborum incididunt laboris culpa consectetur occaecat duis. Fugiat pariatur cupidatat officia pariatur ullamco. Cillum incididunt laborum cupidatat laborum. Aliquip ea et dolor officia in cupidatat cillum incididunt amet sunt.Cupidatat mollit tempor nisi dolore incididunt aute id culpa minim. Commodo quis laborum ut nostrud aute consectetur pariatur dolore labore ex consectetur id cupidatat. Mollit aliquip velit eiusmod nostrud. Et aliquip ullamco minim aute veniam veniam non ad pariatur aliqua ipsum mollit.Magna mollit culpa magna nisi quis duis proident esse laboris culpa sunt voluptate proident. Laborum ad qui do veniam sit duis et labore anim reprehenderit eu. Tempor laboris eu nisi ut tempor non dolor eu occaecat velit occaecat.Ullamco ad pariatur nisi et ex mollit est nostrud commodo. Id irure aliquip laboris commodo consequat aliquip sit nisi voluptate cillum ex enim dolore. Velit ullamco consequat non velit proident veniam.Elit ex proident esse exercitation sint consequat nostrud. Excepteur tempor id mollit do laborum exercitation nostrud aliquip mollit mollit tempor do eu ex. Eu velit irure cupidatat cupidatat nostrud exercitation occaecat sunt nostrud.Aute anim esse quis cupidatat irure dolore deserunt non ad eu incididunt excepteur elit. Commodo id nulla aliqua ut eiusmod aute commodo est ipsum sunt ipsum. Exercitation enim cupidatat nisi irure non qui aliqua. Irure fugiat laborum sunt commodo adipisicing laborum. Pariatur consequat ut elit cupidatat pariatur cupidatat eu non proident proident cupidatat aute ea. Anim sint mollit voluptate esse velit ad sunt nulla consectetur. Tempor minim mollit et laboris duis nulla.Ullamco incididunt laborum amet qui amet. In pariatur ipsum ea fugiat nostrud ipsum nulla dolore incididunt eiusmod non. Consectetur cillum dolor ut exercitation est exercitation non ex Lorem officia consectetur.Dolore anim est pariatur Lorem ipsum dolor dolor ex ea mollit ea. Quis officia ex duis in qui sint dolor non. Quis culpa sit velit velit non."}];

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
        if(activeElement === null || activeElement === undefined) return;

        const elementToMove = todos[activeElement];

        const updatedTodos = todos.filter((_, index) => index !== activeElement);

        if(activeElement > position)
            updatedTodos.splice(position, 0, elementToMove);
        else
            updatedTodos.splice(position-1, 0, elementToMove);
        
        setTodos(updatedTodos);

        // showHolderSpaces(false);
        allHolders = document.querySelectorAll(".minimumHolderSpace");
        [...allHolders].forEach(holder => {
            holder.classList.add('invisibleHolderSpace');
            holder.classList.remove('minimumHolderSpace');
        })
    }

    const showHolderSpaces = (toShow = true, index = -1) => {
        if(toShow){
            allHolders = document.querySelectorAll(".invisibleHolderSpace");
            [...allHolders].forEach( (holder, i) => {
                if(i !== index && i !== index+1) {
                    holder.classList.remove('invisibleHolderSpace');
                    holder.classList.add('minimumHolderSpace');
                }
            })
        }
        else {
            allHolders = document.querySelectorAll(".minimumHolderSpace");
            [...allHolders].forEach(holder => {
                holder.classList.add('invisibleHolderSpace');
                holder.classList.remove('minimumHolderSpace');
            })
        }
    }

    return (
        <div className="toDoList">
            <div className="newToDoField">
                <input ref={inputDescriptionToDoElement} type='text' onChange={(e) => setDescriptionToDo(e.target.value)}></input>
                <button onClick={() => addToDo()}>Agregar tarea</button>
            </div>
            <h1>LISTA DE TAREAS</h1>

            <div className="todos">
                <HolderSpace index={0} onDrop={() => onDrop(0)} />
                {todos.map((a, key) => {
                    return( 
                        <Fragment key={a.id} >
                            <ToDoElement deleteToDo={deleteToDo} id={a.id} description={a.description} index={key} setActiveElement={setActiveElement} showHolderSpaces={showHolderSpaces}/>
                            <HolderSpace index={key+1} onDrop={onDrop} />
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default ToDoList;