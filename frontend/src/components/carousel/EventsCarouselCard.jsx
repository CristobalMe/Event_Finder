import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const EventsCarouselCard = ({ data }) => {
    const [eventAtendance, setEventAtendance] = useState()
    const url = import.meta.env.VITE_URL

    useEffect(() => {
        fetchEventAtendance()
    }, [])

    const fetchEventAtendance = () => {
        fetch(`${url}/attendance/${data.id}`)
            .then((response) => response.json())
            .then((data) => setEventAtendance(data))
            .catch((error) => console.error('Error fetching:', error))
    }
    return (
        <Link to={`/event/${data.id}`}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white h-[20rem] w-[15rem] hover:bg-neutral-300">
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
                        {data.name}
                    </div>
                    <p className="text-gray-700 text-sm mx-[1.1rem]">
                        📍{data.location}
                    </p>
                    <div className="flex justify-center items-center mt-[2rem]">
                        {/* svg from: https://flowbite.com/ */}
                        <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                clipRule="evenodd"
                            />
                        </svg>

                        {eventAtendance && (
                            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                                {eventAtendance.length}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default EventsCarouselCard
