import React, { useEffect, useRef } from 'react'; 
import { Messages } from 'primereact/messages';

export default function Minus() {
    const msgs = useRef(null);

    useEffect(() => {
        msgs.current.show(
            { sticky: true, severity: 'info', detail: 'Amount withdrawn' }
        );
    }, []); 

    return (
        <div className="flex justify-content-center w-75 fs-6">
            <Messages ref={msgs} />
        </div>
    )
}
        