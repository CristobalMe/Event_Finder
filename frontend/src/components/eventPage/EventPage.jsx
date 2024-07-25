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
    let [attendance, setAttendance] = useState()
    const url = import.meta.env.VITE_URL

    useEffect(() => {
        fetchEvent()
        fetchComments()
        fetchUserAttendance()
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

    const fetchUserAttendance = () => {
        fetch(`${url}/attendance/user/${user.username}/${current_eventId}`)
            .then((response) => response.json())
            .then((data) => {
                setAttendance(data)
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
                    <div className="mt-[13rem] flex items-center justify-center">
                        <DisplayEventComments comments={comments} user={user} />
                    </div>

                    {attendance && event && (
                        <div className="h-screen flex items-center justify-center">
                            {/* {(attendance[0].ridesharingUserPreferencesForEvent != undefined && (attendance[0].ridesharingId == undefined || attendance[0].ridesharingId == null)) &&
                             */}
                            <DisplayRideSharingSuggestions
                                user={user}
                                event={event}
                            />
                            {/* } */}
                        </div>
                    )}
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
