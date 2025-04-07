import { Fragment, useContext } from "react"
import HolderSpace from "./HolderSpace"
import ToDoElement from "./ToDoElement"
import { UserContext } from "./ToDoList"

export default function ListElement({ id, title, todos, onDrop }) {

    const { deleteList } = useContext(UserContext);
    return(
        <div className="listElement">
            {/* <div className="removeList" onClick={() => deleteList(id)}> X </div> */}
            <div className="titleList">{title}</div>
            <div className="todos">
                <HolderSpace idList={id} index={0} onDrop={() => onDrop(0, id)}/>
                {
                    (todos.length !== 0) &&
                    todos.map((a, key) => {
                        return( 
                            <Fragment key={a.id} >
                                <ToDoElement
                                    id={a.id}
                                    description={a.description}
                                />
                                <HolderSpace
                                    idList={id}
                                    index={key+1}
                                    onDrop={() => onDrop(key+1, id)}
                                />
                            </Fragment>
                        )
                    })
                }
            </div>
            <div className="removeList" onClick={() => deleteList(id)}> X </div>
        </div>
    )
}