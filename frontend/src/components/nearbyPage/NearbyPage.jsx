import Header from '../header/Header'
import CardGridEvent from '../CardGridEvent'
import { useState, useEffect } from 'react'

function NearbyPage(user) {
    const url = import.meta.env.VITE_URL
    const userData = user.user
    const [eventData, setEventData] = useState()

    useEffect(() => {
        fetchNearbyEvents()
    }, [])

    const fetchNearbyEvents = () => {
        fetch(`${url}/event/nearby/user/${userData.lat}/${userData.long}`)
            .then((response) => response.json())
            .then((data) => setEventData(data))
            .catch((error) => console.error('Error fetching:', error))
    }
    return (
        <div>
            <Header />
            <div className="flex items-center justify-center mt-[20%] ">
                {eventData != undefined && <CardGridEvent data={eventData} />}
            </div>
        </div>
    )
}

export default NearbyPage
