import { useState, useEffect } from 'react'
import Header from '../header/Header'
import DisplayEventInfo from './DisplayEventInfo'
import DisplayEventComments from './DisplayEventComments'
import LoadingPage from '../loadingPage/LoadingPage'
import DisplayRideSharingSuggestions from './DisplayRideSharingSuggestions'

const EventPage = ({ user }) => {
    const current_link = window.location.pathname
    const current_eventId = current_link.split('/')[2]
    const [event, setEvent] = useState()
    const [comments, setComments] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [preferences, setPreferences] = useState()
    let logged = false
    const url = import.meta.env.VITE_URL

    if (user != null && user != undefined) logged = true

    useEffect(() => {
        fetchEvent()
        fetchComments()
        if (logged) fetchUserPreferences()
    }, [])

    const fetchEvent = () => {
        fetch(`${url}${current_link}`)
            .then((response) => response.json())
            .then((data) => {
                setEvent(data)
                setIsLoading(false)
            })
            .catch((error) => console.error('Error fetching:', error))
    }

    const fetchComments = () => {
        fetch(`${url}/comments/${current_eventId}`)
            .then((response) => response.json())
            .then((data) => {
                setComments(data)
                setIsLoading(false)
            })
            .catch((error) => console.error('Error fetching:', error))
    }

    const fetchUserPreferences = () => {
        fetch(
            `${url}/ridesharing/ridesharingUserPreferencesForEvent/${user.username}/${current_eventId}`
        )
            .then((response) => response.json())
            .then((data) => setPreferences(data))
            .catch((error) => console.error('Error fetching:', error))
    }

    return (
        <div>
            {!isLoading && (
                <div>
                    <Header user={user} />
                    <div className="mt-[13rem] flex items-center justify-center">
                        <DisplayEventInfo event={event} user={user} />
                    </div>
                    {/* Check if there are valid preferences (not registered to a group) and if event has loaded */}
                    {preferences && event && (
                        <div className="flex mt-[8rem] items-center justify-center">
                            {preferences != -1 && (
                                <DisplayRideSharingSuggestions
                                    user={user}
                                    event={event}
                                    preferences={preferences}
                                />
                            )}
                        </div>
                    )}
                    <div className="my-[8rem] flex items-center justify-center">
                        <DisplayEventComments comments={comments} user={user} />
                    </div>
                </div>
            )}
            {isLoading && (
                <div>
                    <LoadingPage />
                </div>
            )}
        </div>
    )
}

export default EventPage
