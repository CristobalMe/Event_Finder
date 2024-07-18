import Header from '../header/Header.jsx'
import CardGridAttending from './CardGridEventsAttending.jsx'

function EventsAttendingPage({ user }) {
    return (
        <div>
            <Header user={user} />
            <div className="flex items-center justify-center lg:mt-[10rem] sm:mt-[45rem]">
                <CardGridAttending user={user} />
            </div>
        </div>
    )
}

export default EventsAttendingPage
