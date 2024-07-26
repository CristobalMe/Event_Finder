import { useState, useEffect } from 'react'
import axios from 'axios'
import EventMap from '../EventMap'

const DisplayRideSharingSuggestions = ({ user, event, preferences }) => {
    const url = import.meta.env.VITE_URL
    const [userRidesharesSuggestions, setUserRidesharesSuggestions] = useState(
        []
    )

    useEffect(() => {
        if (preferences) fetchUserRidesharesSuggestions()
    }, [])

    const fetchUserRidesharesSuggestions = () => {
        fetch(`${url}/ridesharing/recommendations/${event.id}/${user.id}`)
            .then((response) => response.json())
            .then((data) => setUserRidesharesSuggestions(data))
            .catch((error) => console.error('Error fetching:', error))
    }

    const handleRidesharingAttendance = async (
        ridesharingId,
        eventName,
        isDeleting
    ) => {
        try {
            await axios.patch(
                `${url}/ridesharing/attendance/${user.username}`,
                {
                    ridesharingId: ridesharingId,
                    eventName: eventName,
                    isDeleting: isDeleting,
                }
            )
            location.reload()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const renderRidesharings = (userRideshares) => {
        return userRideshares.map((rideshare) => (
            <div
                className="grid lg:grid-cols-2 mx-[1rem] my-[1rem] border-2 border-black rounded h-fit p-[.5rem]"
                key={rideshare.id}
            >
                <div className="flex flex-col mx-5 mt-10 justify-center">
                    <p className="bg-white h-fit p-[.2rem] break-all">
                        ⊛ {rideshare.seatsAvailable} seats available
                    </p>
                    <p className="bg-white h-fit p-[.2rem] break-all">
                        ⊛ Departing date:{' '}
                        {rideshare.departingTime.substring(0, 10)}
                    </p>
                    <p className="bg-white h-fit p-[.2rem] break-all">
                        ⊛ Arrival time:{' '}
                        {rideshare.departingTime.substring(11, 16)}
                    </p>
                    <button
                        className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-1 px-2 rounded mr-[1rem] my-[.5rem]"
                        type="button"
                        onClick={() => {
                            handleRidesharingAttendance(
                                rideshare.id,
                                rideshare.eventName,
                                1
                            )
                        }}
                    >
                        Register
                    </button>
                </div>

                <div className="hidden lg:flex lg:flex-col mx-5 mt-10 justify-center">
                    <EventMap
                        latitude={rideshare.departingLat}
                        longitude={rideshare.departingLong}
                    />
                </div>
                {/* Map and route */}
            </div>
        ))
    }

    return (
        <div className="rounded overflow-hidden shadow-lg bg-white h-fit md:w-[50rem] pb-[3rem] xs:w-[20rem]">
            {true && (
                <div>
                    <div className="flex items-center justify-center m-[1rem] ">
                        <div className="inline m-[1rem]">
                            <h2 className="font-bebas text-3xl">
                                Suggested Rideshares
                            </h2>
                        </div>
                    </div>

                    {userRidesharesSuggestions && (
                        <section className="ridesharings-grid">
                            {renderRidesharings(userRidesharesSuggestions)}
                        </section>
                    )}
                </div>
            )}
        </div>
    )
}

export default DisplayRideSharingSuggestions
