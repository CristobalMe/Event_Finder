import { useState } from 'react'
import './EventCreatorTooltip.css'

export default function EventCreatorTooltip({ children, ...rest }) {
    const [show, setShow] = useState(false)

    return (
        <div>
            <div
                className="tooltip"
                style={show ? { visibility: 'visible' } : {}}
            >
                Are you sure?
            </div>
            <div
                {...rest}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {children}
            </div>
        </div>
    )
}
