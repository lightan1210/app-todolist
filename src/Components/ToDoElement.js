import { useEffect, useRef, useState } from "react";

const ToDoElement = ({ deleteToDo, id, description, index, setActiveElement, showHolderSpaces }) => {
    const [isCompleted, setIsCompleted] = useState(false);
    let descriptionToDo = description;

    const toDoElement = useRef();
    const modalElement = useRef();

    useEffect(() => {

        if(isCompleted)
            toDoElement.current.classList.add("Completed");
        else
            toDoElement.current.classList.remove("Completed");

    },[isCompleted])

    return (
        <>
            <div ref={toDoElement} className="toDoElement"
            draggable
            onDragStart={() => {
                setActiveElement(index);
                console.log(`Agarre el elemento ${index}`);
                setTimeout(() => {
                    showHolderSpaces(true, index);
                }, 125);
            }}
            onDragEnd={() => {
                    setActiveElement(null);
                    showHolderSpaces(false);
                }}>
                {/*<h2>TAREA</h2>*/}
                <p onClick={() => modalElement.current.showModal()}>{description}</p>
                <input type="checkbox" onChange={(e) => setIsCompleted(e.target.checked)}></input>
                <div className="removeToDo" onClick={() => deleteToDo(id)}> X </div>
                {/* <div className="seeMore" >Ver mas</div> */}
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