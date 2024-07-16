import CardEvent from '../CardEvent.jsx'
import { useState, useEffect } from 'react'

const CardGridEventsAttending = () => {
    let [events, setEvents] = useState([])
    let [fetched, setFetched] = useState(false)
    let userData = { username: null }
    const url = import.meta.env.VITE_URL

    if (
        !(
            localStorage.getItem('user').includes(null) ||
            localStorage.getItem('user').includes('null')
        )
    ) {
        userData = JSON.parse(localStorage.getItem('user'))
    }

    useEffect(() => {
        if (!fetched) {
            fetchUserAttendance()
        }
        setFetched(true)
    }, [events])

    const fetchUserAttendance = () => {
        fetch(`${url}/event/attending/${userData.username}`)
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
