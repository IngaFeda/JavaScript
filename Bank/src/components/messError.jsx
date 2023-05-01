import React, { useEffect, useRef } from 'react'; 
import { Messages } from 'primereact/messages';

export default function Error() {
    const msgs = useRef(null);

    useEffect(() => {
        msgs.current.show(
            { sticky: true, severity: 'error', detail: 'Error! Cannot be deleted' }
        );
    }, []); 

    return (
        <div className="flex justify-content-center w-75 fs-6">
            <Messages ref={msgs} />
        </div>
    )
}
        