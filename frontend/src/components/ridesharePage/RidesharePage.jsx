import Header from '../header/Header'
import NearbyEventsMap from '../NearbyEventsMap'
import axios from 'axios'
import { useState, useEffect } from 'react'
import MapWithRoute from '../MapWithRoute'

function RidesharePage({ user }) {
    const current_rideshareId = window.location.pathname.split('/')[3]
    const url = import.meta.env.VITE_URL
    const [rideshare, setRideshare] = useState(false)
    const [userPreferences, setUserPreferences] = useState([])
    const [userData, setUserData] = useState([])
    const [lat, setLat] = useState(rideshare.departingLat ?? '0')
    const [long, setLong] = useState(rideshare.departingLong ?? '0')
    const [preferedArrivalTime, setPreferedArrivalTime] = useState()
    const [event, setEvent] = useState([])
    let preferencesIds = []
    let center = {
        lat: lat,
        long: long,
    }

    const mapContainerStyle = {
        width: '20rem',
        height: '15rem',
    }

    useEffect(() => {
        center = {
            lat: lat,
            long: long,
        }
    }, [lat, long])

    useEffect(() => {
        preferencesIds = []
        userPreferences.map((p) => {
            preferencesIds.push(p.attendanceId)
        })
        handleGetAttendances()
        setLat(rideshare.departingLat ?? '0')
        setLong(rideshare.departingLong ?? '0')
    }, [rideshare, userPreferences])

    useEffect(() => {
        if (rideshare.eventName) fetchEvent()
    }, [rideshare])

    useEffect(() => {
        fetchUserRideshare()
        fetchUserPreferences()
    }, [])

    const fetchUserRideshare = () => {
        fetch(`${url}/ridesharing/${current_rideshareId}`)
            .then((response) => response.json())
            .then((data) => setRideshare(data[0]))
            .catch((error) => console.error('Error fetching:', error))
    }

    const fetchUserPreferences = () => {
        fetch(`${url}/ridesharing/preferences/${current_rideshareId}`)
            .then((response) => response.json())
            .then((data) => setUserPreferences(data))
            .catch((error) => console.error('Error fetching:', error))
    }

    const fetchEvent = () => {
        fetch(`${url}/event/byName/${rideshare.eventName}`)
            .then((response) => response.json())
            .then((data) => setEvent(data))
            .catch((error) => console.error('Error fetching:', error))
    }

    const handleGetAttendances = async () => {
        try {
            await axios
                .post(`${url}/attendance/ridesharing/manyIds`, {
                    ids: preferencesIds,
                })
                .then(function (response) {
                    setUserData(response.data)
                })
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handlePatchRideshare = async (ridesharingId) => {
        try {
            await axios.patch(
                `${url}/ridesharing/modify/coordinates/datetime`,
                {
                    ridesharingId: ridesharingId,
                    newLat: lat,
                    newLong: long,
                    newDateTime: preferedArrivalTime,
                }
            )
            location.reload()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const renderPreferences = (userPreferences, userData) => {
        return userPreferences.map((p, index) => (
            <div
                className="mx-[1rem] my-[1rem] border-2 border-black rounded h-fit p-[.5rem]"
                key={index}
            >
                {userData[index] && (
                    <h3 className="text-white font-sans font-bold bg-blue-950 rounded overflow-hidden w-fit h-fit p-[.4rem] mb-[.5rem]">
                        {userData[index].username}
                    </h3>
                )}
                <p className="bg-white h-fit p-[.2rem] break-all">
                    ⊛ Prefered arrival date:{' '}
                    {p.preferedArrivalTime.substring(0, 10)}
                </p>
                <p className="bg-white h-fit p-[.2rem] break-all">
                    ⊛ Prefered arrival time:{' '}
                    {p.preferedArrivalTime.substring(11, 16)}
                </p>
                {userData[index] && (
                    <p className="bg-white h-fit p-[.2rem] break-all">
                        ⊛ Cellphone: {userData[index].cellphoneNumber}
                    </p>
                )}
                {userData[index] && (
                    <p className="bg-white h-fit p-[.2rem] break-all">
                        ⊛ email: {userData[index].email}
                    </p>
                )}
            </div>
        ))
    }

    return (
        <div>
            <div>
                <Header user={user} />
                {rideshare && (
                    <div className="mt-[10rem] flex items-center justify-center overflow-auto">
                        <div className="rounded overflow-hidden shadow-lg bg-white lg:h-fit lg:w-[50rem] xs:w-[22rem] xs:h-fit">
                            <p className="flex items-center justify-center font-bebas text-3xl mt-3 mx-3">
                                {rideshare.eventName}
                            </p>
                            {userPreferences && userData && (
                                <section className="ridesharings-grid">
                                    <h2 className="font-bebas text-2xl ml-5 mb-5">
                                        Passenger Preferences
                                    </h2>
                                    {renderPreferences(
                                        userPreferences,
                                        userData
                                    )}
                                </section>
                            )}
                        </div>
                    </div>
                )}

                {rideshare && (
                    <div className="mt-[5rem] flex items-center justify-center overflow-auto">
                        <div className="rounded overflow-hidden shadow-lg bg-white lg:h-fit lg:w-[50rem] xs:w-[22rem] xs:h-fit">
                            <p className="flex items-center justify-center font-bebas text-3xl mt-3 mx-3">
                                Modify Rideshare
                            </p>

                            <div className="lg:grid lg:grid-cols-2 mx-10">
                                <div className="flex flex-col mx-5 mt-10 justify-center">
                                    <h2 className="text-xl mb-4">Date:</h2>
                                    <div className="mb-4">
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            New preferred arrival datetime:
                                        </label>
                                        <input
                                            className="p-3 rounded"
                                            type="datetime-local"
                                            onChange={(e) =>
                                                setPreferedArrivalTime(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <h2 className="text-xl mb-4">
                                        Departing Coordinates:
                                    </h2>

                                    <div className="mb-4">
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            New latitude:
                                        </label>
                                        <input
                                            type="text"
                                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                            value={lat}
                                            onChange={(e) =>
                                                setLat(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-800 text-sm font-bold mb-2">
                                            New longitude:
                                        </label>
                                        <input
                                            type="text"
                                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                            value={long}
                                            onChange={(e) =>
                                                setLong(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div>
                                        <button
                                            className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
                                            type="button"
                                            onClick={() =>
                                                handlePatchRideshare(
                                                    current_rideshareId
                                                )
                                            }
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                                <div className="hidden lg:flex lg:flex-col justify-center items-center mr-5 mt-3">
                                    <NearbyEventsMap
                                        user={center}
                                        eventData={[center]}
                                        mapContainerStyle={mapContainerStyle}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col mx-5 mt-10 justify-center">
                    <p className="flex items-center justify-center font-bebas text-3xl mt-3 mx-3 text-white">
                        Route
                    </p>
                    {rideshare && (
                        <p className="flex items-center justify-center font-bebas text-xl mt-3 mx-3 text-white">
                            Suggested depparting time:{' '}
                            {rideshare.departingTime.substring(11, 16)}
                        </p>
                    )}
                    {rideshare && (
                        <p className="flex items-center justify-center font-bebas text-xl mt-3 mx-3 text-white">
                            Suggested depparting date:{' '}
                            {rideshare.departingTime.substring(0, 10)}
                        </p>
                    )}
                    {event.lat && (
                        <MapWithRoute
                            origin={{
                                lat: parseFloat(center.lat),
                                lng: parseFloat(center.long),
                            }}
                            destination={{ lat: event.lat, lng: event.long }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default RidesharePage
