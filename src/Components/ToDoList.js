import { useRef, useState } from "react";
import ToDoElement from "./ToDoElement"

let nextId = 0;

const initialToDos = [{id:nextId++, description:"Mollit do in anim anim exercitation dolor in sint velit eu cillum ut consequat excepteur. Excepteur Lorem ut proident aute qui amet sit cillum velit exercitation voluptate fugiat. Nulla commodo laboris ullamco exercitation dolore fugiat. Quis proident ad occaecat consectetur ut enim adipisicing cupidatat eu culpa aute nisi. Labore nisi dolor commodo nostrud proident dolore laboris ex anim id irure. Sunt consectetur enim ipsum sunt ut qui enim ea aliquip incididunt. Ex ex duis quis dolore labore amet Lorem.Lorem excepteur incididunt sit do minim eiusmod ullamco. Id ea dolor tempor voluptate aliqua non amet voluptate ullamco. Eu do voluptate officia Lorem consectetur enim commodo culpa labore incididunt laborum dolor sit ad. Fugiat aute velit laboris nisi ipsum quis voluptate laboris. Veniam incididunt labore Lorem anim non ullamco irure exercitation occaecat officia officia ea sint.Do reprehenderit dolor proident tempor id reprehenderit dolor. Magna et eu id nulla occaecat cupidatat incididunt cupidatat id consequat minim. Ipsum labore officia mollit dolore est id velit non laboris ea irure amet. Id dolor id pariatur dolor officia sunt consectetur aliqua eu aute do. Excepteur occaecat aliquip sint commodo commodo. Est enim magna aliqua sunt in enim ipsum cupidatat anim ullamco eiusmod qui velit ex. Est sunt occaecat ea officia.Eu irure reprehenderit excepteur culpa do culpa in sint eiusmod ipsum. Officia Lorem nostrud ut officia amet ut duis irure aliqua dolore do sit voluptate irure. Minim ea pariatur do laborum velit quis do ad culpa commodo quis aliquip consequat. Lorem et veniam minim exercitation amet. Cupidatat excepteur ut eu ipsum eiusmod nostrud consequat reprehenderit nulla aute amet."}];

const ToDoList = () => {
    
    const [todos, setTodos] = useState(initialToDos);
    const [descriptionToDo, setDescriptionToDo] = useState('');

    const inputDescriptionToDoElement = useRef();
    
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

    return (
        <div className="toDoList">
            <div className="newToDoField">
                <input ref={inputDescriptionToDoElement} type='text' onChange={(e) => setDescriptionToDo(e.target.value)}></input>
                <button onClick={() => addToDo()}>Agregar tarea</button>
            </div>
            <h1>LISTA DE TAREAS</h1>
            <div className="todos">
                {todos.map((a, key) => {
                    return( <ToDoElement deleteToDo={deleteToDo} key={a.id} id={a.id} description={a.description} /> )
                })}
            </div>
        </div>
    )
}

export default ToDoList;