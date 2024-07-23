import Header from '../header/Header'
import CardGridEvent from '../CardGridEvent'
import { useState, useEffect } from 'react'
// import NearbyEventsMap from '../NearbyEventsMap'

function NearbyPage({ user }) {
    const url = import.meta.env.VITE_URL
    const [eventData, setEventData] = useState([])

    // Uncomment for demo
    // const mapContainerStyle = {
    //     width: '40rem',
    //     height: '25rem',
    // }

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
                {/* Uncomment for demo */}
                {/* <NearbyEventsMap user={user} eventData={eventData} mapContainerStyle={mapContainerStyle}/> */}
            </div>
            <div className="flex items-center justify-center mt-[3rem] xs:w-[20rem] md:w-[50rem] h-[25rem] pb-[3rem] mb-[2rem]">
                {eventData != undefined && <CardGridEvent data={eventData} />}
            </div>
        </div>
    )
}

export default NearbyPage
