import Header from '../header/Header.jsx'
import CardGridAttending from './CardGridEventsAttending.jsx'

function EventsAttendingPage() {
    return (
        <div>
            <Header />
            <div className="flex items-center justify-center lg:mt-[10rem] sm:mt-[45rem]">
                <CardGridAttending />
            </div>
        </div>
    )
}

export default EventsAttendingPage
