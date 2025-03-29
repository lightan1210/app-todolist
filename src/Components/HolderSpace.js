import { useContext, useState } from "react"
import { UserContext } from "./ToDoList";

export default function HolderSpace( { index, idList }) {
    const [showHolder, setShowHolder] = useState('invisibleHolderSpace');

    const { onDrop } = useContext(UserContext);

    return (
        <section
            onDragEnter={() => setShowHolder('holderSpace')}
            onDragLeave={() => setShowHolder('minimumHolderSpace')}
            onDrop={ () => {
                onDrop(index, idList);
                setShowHolder('invisibleHolderSpace');
            }}
            onDragOver={e => e.preventDefault()}
            className={showHolder}
        >
        </section>
    )
}