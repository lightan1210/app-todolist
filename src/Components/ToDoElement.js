import { useEffect, useRef, useState } from "react";

const ToDoElement = ({ deleteToDo, id, description }) => {
    const [stateToDo, setStateToDo] = useState(false);

    const toDoElement = useRef();

    useEffect(() => {
        if(stateToDo)
            toDoElement.current.classList.add("Completed");
        else
            toDoElement.current.classList.remove("Completed");

    },[stateToDo])

    return (
        <div ref={toDoElement} className="toDoElement">
            <h2>TAREA</h2>
            <p>{description}</p>
            <input type="checkbox" onChange={(e) => setStateToDo(e.target.checked)}></input>
            <div className="removeToDo" onClick={() => deleteToDo(id)}> X </div>
        </div>
    )
}

export default ToDoElement;