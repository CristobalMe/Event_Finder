import './RotatingEventImages.css'
import RotatingEventCard from './RotatingEventCard'

function RotatingEventImages({ events }) {
    const displayEvent = (events) => {
        return events
            .filter((item, index) => index < 5)
            .map((event, index) => (
                <span style={{ '--a': index }} key={index}>
                    <RotatingEventCard
                        key={event.id}
                        data={event}
                        position={index + 1}
                    />
                </span>
            ))
    }

    return (
        <div className="flex justify-center">
            {events && <div className="box">{displayEvent(events)}</div>}
        </div>
    )
}

export default RotatingEventImages
