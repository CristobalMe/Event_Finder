import { Link } from 'react-router-dom'

const RotatingEventCard = ({ data, position }) => {
    return (
        <Link to={`/event/${data.id}`}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white h-[17rem] w-[15rem] hover:bg-neutral-300">
                <img
                    className="h-[10rem] w-[15rem]"
                    src={data.image}
                    id="image"
                    onError={(e) => {
                        e.target.src =
                            'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg'
                    }}
                />
                <div className="px-3 py-4 flex flex-col justify-center items-center">
                    <div className="font-bold text-base mb-2 mx-[1.3rem]">
                        {position}. {data.name}
                    </div>
                    <p className="text-gray-700 text-sm mx-[1.1rem]">
                        📍{data.location}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default RotatingEventCard
