import { useContext, useState } from "react"
import { UserContext } from "./ToDoList";

export default function HolderSpace( { index, idList }) {
    const { onDrop } = useContext(UserContext);
    
    const [showHolder, setShowHolder] = useState('minimumHolderSpace');


    return (
        <section
            onDragEnter={() => setShowHolder('holderSpace')}
            onDragLeave={() => setShowHolder('minimumHolderSpace')}
            onDrop={ () => {
                onDrop(index, idList);
                setShowHolder('minimumHolderSpace');
            }}
            onDragOver={e => e.preventDefault()}
            className={showHolder}
        >
        </section>
    )
}