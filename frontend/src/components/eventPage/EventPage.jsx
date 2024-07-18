import { useState, useEffect } from 'react'
import Header from '../header/Header'
import DisplayEventInfo from './DisplayEventInfo'
import DisplayEventComments from './DisplayEventComments'
import LoadingPage from '../loadingPage/LoadingPage'

const EventPage = ({ user }) => {
    const current_link = window.location.pathname
    const current_eventId = current_link.split('/')[2]
    const [event, setEvent] = useState()
    const [comments, setComments] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchEvent()
        fetchComments()
    }, [])

    const fetchEvent = () => {
        fetch(`http://localhost:3000${current_link}`)
            .then((response) => response.json())
            .then((data) => {
                setEvent(data)
                setIsLoading(false)
            })
            .catch((error) => console.error('Error fetching:', error))
    }

    const fetchComments = () => {
        fetch(`http://localhost:3000/comments/${current_eventId}`)
            .then((response) => response.json())
            .then((data) => {
                setComments(data)
                setIsLoading(false)
            })
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
                    <div className="h-screen flex items-center justify-center">
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
