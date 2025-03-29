// import { Fragment, useRef, useState, createContext } from "react";
import { useRef, useState, createContext } from "react";
// import ToDoElement from "./ToDoElement"
// import HolderSpace from "./HolderSpace";
import ListElement from "./ListElement";

let nextIdToDo = 0;
let nextIdList = 0;

const initialLists = [{id:nextIdList++, title:"Lorem, ipsum dolor"}];

const initialToDos = [{id:nextIdToDo++, description:"Lorem duis mollit Lorem aliquip ea laborum incididunt laboris culpa consectetur occaecat duis. Fugiat pariatur cupidatat officia pariatur ullamco. Cillum incididunt laborum cupidatat laborum. Aliquip ea et dolor officia in cupidatat cillum incididunt amet sunt.Cupidatat mollit tempor nisi dolore incididunt aute id culpa minim. Commodo quis laborum ut nostrud aute consectetur pariatur dolore labore ex consectetur id cupidatat. Mollit aliquip velit eiusmod nostrud. Et aliquip ullamco minim aute veniam veniam non ad pariatur aliqua ipsum mollit.Magna mollit culpa magna nisi quis duis proident esse laboris culpa sunt voluptate proident. Laborum ad qui do veniam sit duis et labore anim reprehenderit eu. Tempor laboris eu nisi ut tempor non dolor eu occaecat velit occaecat.Ullamco ad pariatur nisi et ex mollit est nostrud commodo. Id irure aliquip laboris commodo consequat aliquip sit nisi voluptate cillum ex enim dolore. Velit ullamco consequat non velit proident veniam.Elit ex proident esse exercitation sint consequat nostrud. Excepteur tempor id mollit do laborum exercitation nostrud aliquip mollit mollit tempor do eu ex. Eu velit irure cupidatat cupidatat nostrud exercitation occaecat sunt nostrud.Aute anim esse quis cupidatat irure dolore deserunt non ad eu incididunt excepteur elit. Commodo id nulla aliqua ut eiusmod aute commodo est ipsum sunt ipsum. Exercitation enim cupidatat nisi irure non qui aliqua. Irure fugiat laborum sunt commodo adipisicing laborum. Pariatur consequat ut elit cupidatat pariatur cupidatat eu non proident proident cupidatat aute ea. Anim sint mollit voluptate esse velit ad sunt nulla consectetur. Tempor minim mollit et laboris duis nulla.Ullamco incididunt laborum amet qui amet. In pariatur ipsum ea fugiat nostrud ipsum nulla dolore incididunt eiusmod non. Consectetur cillum dolor ut exercitation est exercitation non ex Lorem officia consectetur.Dolore anim est pariatur Lorem ipsum dolor dolor ex ea mollit ea. Quis officia ex duis in qui sint dolor non. Quis culpa sit velit velit non.", idList:0}];

export const UserContext = createContext();

const ToDoList = () => {
    
    const [activeElement, setActiveElement] = useState(null);
    
    const [todos, setTodos] = useState(initialToDos);
    // const [descriptionToDo, setDescriptionToDo] = useState('');

    const [lists, setLists] = useState(initialLists);
    // const [titleList, setTitleList] = useState('');
    
    const inputDescriptionToDoElement = useRef();
    const inputTitleListElement = useRef();

    let allHolders = document.querySelectorAll(".invisibleHolderSpace");

    const addList = (titleName) => {
        // if(titleList) {

        if(titleName) {
            // setLists([...lists, {id:nextIdList++, title:titleList}]);
            setLists([...lists, {id:nextIdList++, title:titleName}]);
            inputTitleListElement.current.value = '';
            // setTitleList(inputTitleListElement.current.value);
            inputTitleListElement.current.focus();
        }
        else
            console.log("No se ha ingresado un título para la nueva lista");
    }
    
    const addToDo = (descriptionToDo) => {

        if(!lists[0]) {
            console.log("Debe crear primero una lista antes de agregar una tarea");
        }
        else {

            if(descriptionToDo) {
                setTodos([...todos, {id:nextIdToDo++, description:descriptionToDo, idList:lists[0].id}].sort((a,b) => a.idList - b.idList));
                inputDescriptionToDoElement.current.value = '';
                // setDescriptionToDo(inputDescriptionToDoElement.current.value);
                inputDescriptionToDoElement.current.focus();
            }
            else
            console.log("Falta describir la tarea a realizar");
        }
    }

    function deleteToDo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    function deleteList(id) {

        const updatedTodos = todos.filter(todo => todo.idList !== id);
        setTodos(updatedTodos);

        const updatedLists = lists.filter(list => list.id !== id);
        setLists(updatedLists);

    }

    const onDrop = (position, idDestinyList ) => {
        if(activeElement === null || activeElement === undefined) return;

        const elementToMove = (todos.filter(e => e.idList === activeElement.idList))[activeElement.index];
        
        const updatedTodos = todos.filter(e => e != elementToMove);
        
        if(elementToMove.idList !== idDestinyList)
            elementToMove.idList = idDestinyList;
        
        const sameToDos = updatedTodos.filter(e => e.idList === elementToMove.idList);
        const remainToDos = updatedTodos.filter(e => e.idList !== elementToMove.idList);
        
        if(activeElement.index > position)
            sameToDos.splice(position, 0, elementToMove);
        else
            sameToDos.splice(position-1, 0, elementToMove);
        
        setTodos([...remainToDos,...sameToDos].sort((a,b) => a.idList - b.idList));

        allHolders = document.querySelectorAll(".minimumHolderSpace");
        [...allHolders].forEach(holder => {
            holder.classList.add('invisibleHolderSpace');
            holder.classList.remove('minimumHolderSpace');
        })
    }

    const showHolderSpaces = (toShow = true, index, idList) => {
    // const showHolderSpaces = (toShow = true, index = -1, idListElement) => {
        if(toShow){
            allHolders = document.querySelectorAll(".invisibleHolderSpace");
            [...allHolders].forEach( (holder, i) => {
                holder.classList.remove('invisibleHolderSpace');
                holder.classList.add('minimumHolderSpace');
            });

            const element = (todos.filter(e => e.idList === idList))[index];

            const positionElement = todos.findIndex(e => e == element);

            // console.log(idList + " " + index);
            // console.log(positionElement);

            allHolders[positionElement+idList].classList.add('invisibleHolderSpace');
            allHolders[positionElement+idList+1].classList.add('invisibleHolderSpace');
            allHolders[positionElement+idList].classList.remove('minimumHolderSpace');
            allHolders[positionElement+idList+1].classList.remove('minimumHolderSpace');
            
        }
        else {
            allHolders = document.querySelectorAll(".minimumHolderSpace");
            [...allHolders].forEach(holder => {
                holder.classList.add('invisibleHolderSpace');
                holder.classList.remove('minimumHolderSpace');
            })
        }
    }
    //onChange={(e) => setTitleList(e.target.value)}
    return (
        <div className="toDoList">
                <div className="newListField">
                    <input ref={inputTitleListElement} type='text'></input>
                    <button onClick={() => addList(inputTitleListElement.current.value)}>Crear lista</button>
                </div>
                <div className="newToDoField">
                    <input ref={inputDescriptionToDoElement} type='text'></input>
                    <button onClick={() => addToDo(inputDescriptionToDoElement.current.value)}>Agregar tarea</button>
                </div>
                <h1>LISTA DE TAREAS</h1>
                {/* {console.log(todos)} */}
                <UserContext.Provider value={{onDrop, deleteToDo, setActiveElement, showHolderSpaces}} >
                    <div className="lists">
                        {
                            (lists.length !== 0) &&
                            lists.map((list, key) => {
                                let toDosOnThisList = todos.filter(({idList}) => list.id === idList);
                                return(
                                    <ListElement id={list.id} key={list.id} title={list.title} todos={toDosOnThisList} deleteList={deleteList}/>
                                )
                            })

                        }
                    </div>
                </UserContext.Provider>
            </div>
    )
}

export default ToDoList;