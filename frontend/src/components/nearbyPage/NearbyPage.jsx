import Header from '../header/Header'
import CardGridEvent from '../CardGridEvent'
import { useState, useEffect } from 'react'

function NearbyPage() {
    const url = import.meta.env.VITE_URL
    const userData = JSON.parse(localStorage.getItem('user'))
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
            <div className="h-screen flex items-center justify-center lg:mt-[10rem] sm:mt-[15rem]">
                <CardGridEvent data={eventData} />
            </div>
        </div>
    )
}

export default NearbyPage
