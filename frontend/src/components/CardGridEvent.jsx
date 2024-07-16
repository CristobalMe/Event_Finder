import CardEvent from './CardEvent'

const CardGridEvent = (data) => {
    return (
        <div>
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 ">
                {data.data.map((d) => (
                    <div className="m-[3rem]" key={d.id}>
                        <CardEvent data={d} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardGridEvent
