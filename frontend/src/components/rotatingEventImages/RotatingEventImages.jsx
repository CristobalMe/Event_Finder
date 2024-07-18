import './RotatingEventImages.css'
import RotatingEventCard from './RotatingEventCard'

function RotatingEventImages({ events }) {
    const displayEvent = (events) => {
        return events.map((event, index) => (
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
        <div>{events && <div className="box">{displayEvent(events)}</div>}</div>
    )
}

export default RotatingEventImages
