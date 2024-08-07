import Header from '../header/Header'
import CardGridEvent from '../CardGridEvent'
import { useState, useEffect } from 'react'
import NearbyEventsMap from '../NearbyEventsMap'

function NearbyPage({ user }) {
    const url = import.meta.env.VITE_URL
    const [eventData, setEventData] = useState([])

    const mapContainerStyle = {
        width: '40rem',
        height: '25rem',
    }

    useEffect(() => {
        fetchNearbyEvents()
    }, [])

    const fetchNearbyEvents = () => {
        fetch(`${url}/event/nearby/user/${user.lat}/${user.long}`)
            .then((response) => response.json())
            .then((data) => setEventData(data))
            .catch((error) => console.error('Error fetching:', error))
    }

    return (
        <div>
            <Header user={user} />
            <div className="flex items-center justify-center mt-[10rem]">
                <NearbyEventsMap
                    user={user}
                    eventData={eventData}
                    mapContainerStyle={mapContainerStyle}
                />
            </div>
            <div>
                {eventData != undefined && <CardGridEvent data={eventData} />}
            </div>
        </div>
    )
}

export default NearbyPage
