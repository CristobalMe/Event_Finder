import './RotatingEventImages.css'
import RotatingEventCard from './RotatingEventCard'

function RotatingEventImages(events) {
    return (
        <div>
            {events.events && (
                <div className="box">
                    <span style={{ '--a': 0 }}>
                        <RotatingEventCard
                            key={events.events[0].id}
                            data={events.events[0]}
                            position={1}
                        />
                    </span>
                    <span style={{ '--a': 1 }}>
                        <RotatingEventCard
                            key={events.events[1].id}
                            data={events.events[1]}
                            position={2}
                        />
                    </span>
                    <span style={{ '--a': 2 }}>
                        <RotatingEventCard
                            key={events.events[2].id}
                            data={events.events[2]}
                            position={3}
                        />
                    </span>
                    <span style={{ '--a': 3 }}>
                        <RotatingEventCard
                            key={events.events[3].id}
                            data={events.events[3]}
                            position={4}
                        />
                    </span>
                    <span style={{ '--a': 4 }}>
                        <RotatingEventCard
                            key={events.events[4].id}
                            data={events.events[4]}
                            position={5}
                        />
                    </span>
                </div>
            )}
        </div>
    )
}

export default RotatingEventImages
