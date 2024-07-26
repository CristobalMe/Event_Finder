import CardEvent from './CardEvent'

const CardGridEvent = ({ data }) => {
    return (
        <div>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 ">
                {data.map((d) => (
                    <div className="ml-[8rem]" key={d.id}>
                        <CardEvent data={d} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardGridEvent
