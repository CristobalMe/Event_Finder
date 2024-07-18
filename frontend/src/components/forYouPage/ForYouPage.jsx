import Header from '../header/Header'
import CardGridEvent from '../CardGridEvent'
import { useState, useEffect } from 'react'

function ForYouPage({ user }) {
    const url = import.meta.env.VITE_URL
    const [eventData, setEventData] = useState()

    useEffect(() => {
        fetchRecommendedEvents()
    }, [])

    const fetchRecommendedEvents = () => {
        fetch(`${url}/users/recommendedEvents/${user.id}`)
            .then((response) => response.json())
            .then((data) => setEventData(data))
            .catch((error) => console.error('Error fetching:', error))
    }
    return (
        <div>
            <Header user={user} />
            <div className="flex items-center justify-center md:mt-[10rem] xs:mt-[12rem]">
                <h2 className="flex justify-center font-bebas text-white text-3xl">
                    Top 10 events for you
                </h2>
            </div>
            <div className="flex items-center justify-center mt-[0rem]">
                {eventData != undefined && <CardGridEvent data={eventData} />}
            </div>
        </div>
    )
}

export default ForYouPage
