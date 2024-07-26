import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const DisplayUserRidesharings = ({ user }) => {
    const url = import.meta.env.VITE_URL
    const [userRidesharesDriving, setUserRidesharesDriving] = useState([])
    const [userRidesharesNotDriving, setUserRidesharesNotDriving] = useState([])

    useEffect(() => {
        fetchUserRideshares()
        fetchUserNoDriverRideshares()
    }, [])

    const fetchUserRideshares = () => {
        fetch(`${url}/ridesharing/user/driving/${user.username}`)
            .then((response) => response.json())
            .then((data) => setUserRidesharesDriving(data))
            .catch((error) => console.error('Error fetching:', error))
    }

    const fetchUserNoDriverRideshares = () => {
        fetch(`${url}/ridesharing/user/notDriving/${user.username}`)
            .then((response) => response.json())
            .then((data) => setUserRidesharesNotDriving(data))
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

    const renderRidesharings = (userRideshares, isDriving, isSuggestion) => {
        return userRideshares.map((rideshare) => (
            <div
                className="mx-[1rem] my-[1rem] border-2 border-black rounded h-fit p-[.5rem]"
                key={rideshare.id}
            >
                <h3 className="text-white font-sans font-bold bg-blue-950 rounded overflow-hidden w-fit h-fit p-[.4rem] mb-[.5rem]">
                    {rideshare.eventName}
                </h3>
                <p className="bg-white h-fit p-[.2rem] break-all">
                    ⊛ {rideshare.seatsAvailable} seats available
                </p>
                <p className="bg-white h-fit p-[.2rem] break-all">
                    ⊛ Date: {rideshare.arrivalTime.substring(0, 10)}
                </p>
                <p className="bg-white h-fit p-[.2rem] break-all">
                    ⊛ Arrival time: {rideshare.arrivalTime.substring(11, 16)}
                </p>
                {!isSuggestion && !isDriving && (
                    <button
                        className="bg-red-700 hover:bg-red-950 text-white font-bold py-1 px-2 rounded mr-[1rem] my-[.5rem]"
                        type="button"
                        onClick={() => {
                            handleRidesharingAttendance(
                                rideshare.id,
                                rideshare.eventName,
                                0
                            )
                        }}
                    >
                        Unregister
                    </button>
                )}
                {isDriving && (
                    <Link to={`/ridesharing/manage/${rideshare.id}`}>
                        <button
                            className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-1 px-2 rounded mr-[1rem] my-[.5rem]"
                            type="button"
                        >
                            Manage Rideshare
                        </button>
                    </Link>
                )}

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
                                {user.username} Rideshares
                            </h2>
                        </div>
                    </div>

                    {userRidesharesDriving && (
                        <section className="ridesharings-grid">
                            <h2 className="font-bebas text-2xl ml-5">
                                Driving
                            </h2>
                            {renderRidesharings(
                                userRidesharesDriving,
                                true,
                                false
                            )}
                        </section>
                    )}

                    {userRidesharesNotDriving && (
                        <section className="ridesharings-grid">
                            <h2 className="font-bebas text-2xl ml-5">
                                Not Driving
                            </h2>
                            {renderRidesharings(
                                userRidesharesNotDriving,
                                false,
                                false
                            )}
                        </section>
                    )}
                </div>
            )}
        </div>
    )
}

export default DisplayUserRidesharings
