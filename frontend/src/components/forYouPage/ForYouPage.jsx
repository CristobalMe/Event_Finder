import Header from '../header/Header'
import CardGridEvent from '../CardGridEvent'
import { useState, useEffect } from 'react'

function ForYouPage(user) {
    const url = import.meta.env.VITE_URL
    const userData = user.user
    const [eventData, setEventData] = useState()

    useEffect(() => {
        fetchRecommendedEvents()
    }, [])

    const fetchRecommendedEvents = () => {
        fetch(`${url}/users/recommendedEvents/${userData.id}`)
            .then((response) => response.json())
            .then((data) => setEventData(data))
            .catch((error) => console.error('Error fetching:', error))
    }
    return (
        <div>
            <Header />
            <div className="flex items-center justify-center md:mt-[10%] xs:mt-[20%]">
                {eventData != undefined && <CardGridEvent data={eventData} />}
            </div>
        </div>
    )
}

export default ForYouPage
