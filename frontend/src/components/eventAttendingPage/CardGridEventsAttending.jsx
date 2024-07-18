import CardEvent from '../CardEvent.jsx'
import { useState, useEffect } from 'react'

const CardGridEventsAttending = ({ user }) => {
    let [events, setEvents] = useState([])
    const url = import.meta.env.VITE_URL

    useEffect(() => {
        fetchUserAttendance()
    }, [])

    const fetchUserAttendance = () => {
        fetch(`${url}/event/attending/${user.username}`)
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error('Error fetching:', error))
    }

    return (
        <div>
            {events && (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 ">
                    {events.map((d) => (
                        <div className="m-[3rem]" key={d.id}>
                            <CardEvent data={d} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CardGridEventsAttending
