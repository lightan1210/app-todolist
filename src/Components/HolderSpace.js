import { useState } from "react"

export default function HolderSpace( { index, onDrop }) {
    const [showHolder, setShowHolder] = useState('invisibleHolderSpace');

    return (
        <section
            onDragEnter={() => setShowHolder('holderSpace')}
            onDragLeave={() => setShowHolder('minimumHolderSpace')}
            onDrop={ () => {
                onDrop(index);
                setShowHolder('invisibleHolderSpace');
            }}
            onDragOver={e => e.preventDefault()}
            className={showHolder}
        >
        </section>
    )
}