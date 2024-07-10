import { useState, useEffect } from 'react'
import Header from '../header/Header'
import DisplayEventInfo from './DisplayEventInfo'
import DisplayEventComments from './DisplayEventComments'
import LoadingPage from '../loadingPage/LoadingPage'

const EventPage = () => {
    const current_link = window.location.pathname
    const current_eventId = current_link.split('/')[2]
    const [event, setEvent] = useState()
    const [comments, setComments] = useState()
    let [changeInEvent, setchangeInEvent] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (changeInEvent) {
            setIsLoading(true)
            fetchEvent()
            fetchComments()
        }
        setIsLoading(false)
        setchangeInEvent(false)
    }, [event])

    const fetchEvent = () => {
        fetch(`http://localhost:3000${current_link}`)
            .then((response) => response.json())
            .then((data) => setEvent(data))
            .catch((error) => console.error('Error fetching:', error))
    }

    const fetchComments = () => {
        fetch(`http://localhost:3000/comments/${current_eventId}`)
            .then((response) => response.json())
            .then((data) => setComments(data))
            .catch((error) => console.error('Error fetching:', error))
    }

    return (
        <div>
            {!isLoading && (
                <div>
                    <Header />
                    <div className="h-screen flex items-center justify-center">
                        <DisplayEventInfo event={event} />
                    </div>
                    <div className="h-screen flex items-center justify-center">
                        <DisplayEventComments comments={comments} />
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
