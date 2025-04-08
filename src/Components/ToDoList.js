// import { Fragment, useRef, useState, createContext } from "react";
import { useRef, useState, createContext } from "react";
// import ToDoElement from "./ToDoElement"
// import HolderSpace from "./HolderSpace";
import ListElement from "./ListElement";


export const UserContext = createContext();

let nextIdToDo = 0;
let nextIdList = 0;

// const allToDos = [{id:nextIdToDo++, description:"Lorem duis mollit Lorem aliquip ea laborum incididunt laboris culpa consectetur occaecat duis. Fugiat pariatur cupidatat officia pariatur ullamco. Cillum incididunt laborum cupidatat laborum. Aliquip ea et dolor officia in cupidatat cillum incididunt amet sunt.Cupidatat mollit tempor nisi dolore incididunt aute id culpa minim. Commodo quis laborum ut nostrud aute consectetur pariatur dolore labore ex consectetur id cupidatat. Mollit aliquip velit eiusmod nostrud. Et aliquip ullamco minim aute veniam veniam non ad pariatur aliqua ipsum mollit.Magna mollit culpa magna nisi quis duis proident esse laboris culpa sunt voluptate proident. Laborum ad qui do veniam sit duis et labore anim reprehenderit eu. Tempor laboris eu nisi ut tempor non dolor eu occaecat velit occaecat.Ullamco ad pariatur nisi et ex mollit est nostrud commodo. Id irure aliquip laboris commodo consequat aliquip sit nisi voluptate cillum ex enim dolore. Velit ullamco consequat non velit proident veniam.Elit ex proident esse exercitation sint consequat nostrud. Excepteur tempor id mollit do laborum exercitation nostrud aliquip mollit mollit tempor do eu ex. Eu velit irure cupidatat cupidatat nostrud exercitation occaecat sunt nostrud.Aute anim esse quis cupidatat irure dolore deserunt non ad eu incididunt excepteur elit. Commodo id nulla aliqua ut eiusmod aute commodo est ipsum sunt ipsum. Exercitation enim cupidatat nisi irure non qui aliqua. Irure fugiat laborum sunt commodo adipisicing laborum. Pariatur consequat ut elit cupidatat pariatur cupidatat eu non proident proident cupidatat aute ea. Anim sint mollit voluptate esse velit ad sunt nulla consectetur. Tempor minim mollit et laboris duis nulla.Ullamco incididunt laborum amet qui amet. In pariatur ipsum ea fugiat nostrud ipsum nulla dolore incididunt eiusmod non. Consectetur cillum dolor ut exercitation est exercitation non ex Lorem officia consectetur.Dolore anim est pariatur Lorem ipsum dolor dolor ex ea mollit ea. Quis officia ex duis in qui sint dolor non. Quis culpa sit velit velit non.", idList:0},{id:nextIdToDo++, description:"Dolore laborum dolore amet mollit ex ut velit aliquip sit enim deserunt reprehenderit anim cupidatat. Fugiat sint nostrud enim labore laboris cupidatat duis velit dolor. Incididunt exercitation cupidatat consequat culpa. Culpa ipsum nisi enim nulla quis mollit nisi eiusmod ad proident.",idList:0},{id:nextIdToDo++, description:"Consectetur Lorem dolor quis esse sit aliqua nostrud in in ut. Cillum exercitation irure adipisicing do occaecat ad laborum sint sit veniam. Aliquip qui proident enim anim aute est ipsum in ea tempor magna. Et ea fugiat excepteur cillum adipisicing. Aute consequat fugiat magna cillum sunt.",idList:0},{id:nextIdToDo++, description:"Do sit minim ea esse ex ad fugiat aliquip nisi nisi Lorem est anim exercitation.",idList:1}];

// const initialLists = [{id:nextIdList++, title:"Lorem, ipsum dolor", todos:allToDos.filter(todo => todo.idList === 0)},{id:nextIdList++, title:"Commodo officia qui ex dolor.", todos:allToDos.filter(todo => todo.idList === 1)}];

const ToDoList = () => {
    
    const [activeElement, setActiveElement] = useState(null);
    
    const [todos, setTodos] = useState([]);
    // const [descriptionToDo, setDescriptionToDo] = useState('');

    const [lists, setLists] = useState([]);
    // const [titleList, setTitleList] = useState('');

    const [destinyLists, setDestinyLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);

    const inputDescriptionToDoElement = useRef();
    const inputTitleListElement = useRef();
    const selectElement = useRef();
    
    const addList = (titleName) => {
        if(titleName) {
            
            if(!(lists.some(list => list.title === titleName))) {
                const updatedDestinyLists = [...destinyLists, {destiny:titleName, idDestinyLists: nextIdList}];
                setDestinyLists(updatedDestinyLists);

                if(lists.length === 0)
                    setSelectedList(nextIdList);
                else
                    setSelectedList(updatedDestinyLists[updatedDestinyLists.length-1].idDestinyLists);

                setLists([...lists, {id:nextIdList++, title:titleName, todos:[]}]);
                inputTitleListElement.current.value = '';
                inputTitleListElement.current.focus();
            }
            else
                console.log(`Ya existe una lista con el título ${titleName}.`)
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
                const destiny = destinyLists.find(list => list.destiny === selectElement.current.value);
                setTodos([...todos,{id:nextIdToDo++, description:descriptionToDo, idList: destiny.idDestinyLists}].sort((a, b) => a.idList - b.idList));
                inputDescriptionToDoElement.current.value = '';
                inputDescriptionToDoElement.current.focus();
            }
            else
                console.log("Falta describir la tarea a realizar");
        }
    }

    function deleteList(idList) {
        const updatedTodos = todos.filter(todo => todo.idList !== idList);
        setTodos(updatedTodos);
        const updatedDestinyLists = destinyLists.filter(destinyList => destinyList.idDestinyLists !== idList);

        if(updatedDestinyLists.length !== 0) {
            if(!(updatedDestinyLists.some(list => list.idDestinyLists === selectedList)))
                setSelectedList(updatedDestinyLists[0].idDestinyLists);
        }
        else
            setSelectedList(null);

        setDestinyLists(updatedDestinyLists);
        const updatedLists = lists.filter(list => list.id !== idList);
        setLists(updatedLists);
    }
    
    function deleteToDo(id) {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    }
    
    const onDrop = (position, idDestinyLists ) => {
        if(activeElement === null || activeElement === undefined) return;

        const indexOfElementToMove = todos.findIndex(todo => todo.id === activeElement);
        const globalOriginOfDestinyPosition = todos.findIndex(todo => todo.idList === idDestinyLists);
        const elementToMove = todos[indexOfElementToMove];
        const updatedTodos = todos.filter(todo => todo !== elementToMove);

        if(elementToMove.idList !== idDestinyLists)
            elementToMove.idList = idDestinyLists;

        if(indexOfElementToMove < globalOriginOfDestinyPosition + position)
            updatedTodos.splice(globalOriginOfDestinyPosition + position-1, 0, elementToMove);
        else
            updatedTodos.splice(globalOriginOfDestinyPosition + position, 0, elementToMove);

        setTodos(updatedTodos);
    }

    return (
        <div className="toDoList">
            <div className="newListField">
                <input ref={inputTitleListElement} type='text'></input>
                <button onClick={() => addList(inputTitleListElement.current.value)}>Crear lista</button>
            </div>
                        <div className="newToDoField">
                        <input
                            ref={inputDescriptionToDoElement}
                            type='text'
                            disabled={destinyLists.length === 0}
                        >

                            </input>
                        {destinyLists.length !== 0 ? <span>Colocar tarea en</span> : <span></span>}
                        <select
                            className="destinyListOptions"
                            ref={selectElement}
                            onChange={() => setSelectedList((destinyLists.find(list => list.destiny === selectElement.current.value)).idDestinyLists)}
                            value={destinyLists.length !== 0 && (destinyLists.find(list => list.idDestinyLists === selectedList)).destiny}
                            disabled={destinyLists.length === 0}
                        >
                        {
                            destinyLists.map((list,key) => {
                                return (<option key={key} value={list.destiny.toString()}>{list.destiny}</option>)
                            })
                        }
                        </select>
                        <button
                            onClick={() => addToDo(inputDescriptionToDoElement.current.value)}
                            disabled={destinyLists.length === 0}
                        >
                            Agregar tarea
                        </button>
                        </div>
            <h1>LISTA DE TAREAS</h1>
            <UserContext.Provider value={{onDrop, deleteToDo, deleteList, activeElement, setActiveElement }} >
                <div className="lists">
                        {
                            lists.length !== 0 ?
                            lists.map((list) => {
                                return(
                                    <ListElement
                                    id={list.id}
                                    key={list.id}
                                    title={list.title}
                                    painted={list.id === selectedList}
                                    todos={todos.filter(todo => todo.idList === list.id)}
                                    activeElement={activeElement}
                                    />
                                )
                            })
                            :
                            
                            <ol className="noLists">
                                <li>
                                    Cree una lista   colocándole un título en el campo y luego pulse el botón "Crear Lista".
                                </li>
                                <li>
                                    Para agregar tareas a una lista entonces complete el segundo campo con la tarea, elija la lista en la cual desea colocarla y luego haz click en el botón "Crear Tarea".
                                </li>
                            </ol>
                        }
                </div>
            </UserContext.Provider>
        </div>
    )
}

export default ToDoList;