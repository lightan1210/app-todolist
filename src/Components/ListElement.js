import { Fragment } from "react"
import HolderSpace from "./HolderSpace"
import ToDoElement from "./ToDoElement"

export default function ListElement({ id, title, todos, deleteList }) {
    return(
        <div className="listElement">
            {/* <div className="removeList" onClick={() => deleteList(id)}> X </div> */}
            <div className="titleList">{title}</div>
            <div className="todos">
                <HolderSpace index={0} idList={id} />
                {
                    (todos.length !== 0) &&
                    todos.map((a, key) => {
                        return( 
                            <Fragment key={a.id} >
                                {/* <ToDoElement
                                    deleteToDo={deleteToDo}
                                    id={a.id}
                                    description={a.description}
                                    index={key}
                                    setActiveElement={setActiveElement}
                                    showHolderSpaces={showHolderSpaces}
                                /> */}
                                <ToDoElement
                                    id={a.id}
                                    description={a.description}
                                    index={key}
                                    idList={id}
                                />
                                {/* <HolderSpace index={key+1} onDrop={onDrop} /> */}
                                <HolderSpace index={key+1} idList={id}/>
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}