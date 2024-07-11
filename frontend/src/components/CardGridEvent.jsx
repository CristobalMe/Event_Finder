import CardEvent from './CardEvent'

const CardGridEvent = (data) => {
    let eventData = []
    if (data.data != undefined) {
        eventData = data.data
    }
    return (
        <div>
            {eventData.length > 0 && (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 ">
                    {eventData.map((d) => (
                        <div className="m-[3rem]" key={d.id}>
                            <CardEvent data={d} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CardGridEvent
