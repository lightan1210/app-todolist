import { useContext, useRef, useState } from "react";
import { UserContext } from "./ToDoList";

const ToDoElement = ({ id, description }) => {
    const [isCompleted, setIsCompleted] = useState(false);
    let descriptionToDo = description;

    const toDoElement = useRef();
    const modalElement = useRef();

    const { deleteToDo, setActiveElement } = useContext(UserContext);

    return (
        <>
            <div ref={toDoElement} className={isCompleted ? "toDoElement completed" : "toDoElement"}
                draggable
                onDragStart={() => {
                    setTimeout(() => {
                        setActiveElement(id);
                    }, 200);
                }}
                onDragEnd={() => {
                    setActiveElement(null);
                }}
            >
                <p onClick={() => modalElement.current.showModal()}>{description}</p>
                <input type="checkbox" onChange={(e) => setIsCompleted(e.target.checked)}></input>
                <div className="removeToDo" onClick={() => deleteToDo(id)}> X </div>
            </div>
            
            <dialog className="modalDialog" closedby='any' ref={modalElement}>
                <form>
                    <button formMethod="dialog">X</button>
                </form>
                <p>
                    {descriptionToDo}
                </p>
            </dialog>
        </>
    )
}

export default ToDoElement;