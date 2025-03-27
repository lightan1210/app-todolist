import { useState } from "react"

export default function HolderSpace( { onDrop }) {
    const [showHolder, setShowHolder] = useState('invisibleHolderSpace');

    return (
        <section
            onDragEnter={() => setShowHolder('holderSpace')}
            onDragLeave={() => setShowHolder('minimumHolderSpace')}
            onDrop={ () => {
                onDrop();
                setShowHolder('invisibleHolderSpace');
            }}
            onDragOver={e => e.preventDefault()}
            className={showHolder}
        >
        </section>
    )
}