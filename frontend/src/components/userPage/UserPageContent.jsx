import { useState, useEffect } from 'react'
import CreateEventForm from './CreateEventForm'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../UserContext'
import axios from 'axios'

const UserPageContent = () => {
    const userData = JSON.parse(localStorage.getItem('user'))
    const url = import.meta.env.VITE_URL
    const [userEvents, setUserEvents] = useState()
    let [eventAttendance, setEventAttendance] = useState()
    let [idEventAttendance, setIdEventAttendance] = useState()
    let [eventModify, setEventModify] = useState()
    let [showEventAttendance, setShowEventAttendance] = useState(false)
    // Form ----------------------------------
    const [form, setForm] = useState(false)
    const [eventLocation, setEventLocation] = useState('')
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [duration, setDuration] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    // ---------------------------------------
    const [userPosition, setUserPosition] = useState({
        latitude: 0,
        longitude: 0,
    })
    let [customLocation, setCustomLocation] = useState(false)
    const { updateUser } = useContext(UserContext)

    useEffect(() => {
        fetchUserEvents()
        if ('geolocation' in navigator && !customLocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setUserPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            })
        }
    }, [])

    const toggleForm = (event) => {
        setEventLocation(event.location)
        setLat(event.lat)
        setLong(event.long)
        setDuration(event.duration)
        setDescription(event.description)
        setImage(event.image)
        setDate(event.date)
        setTime(event.time)

        setForm(!form)
        setEventModify(event)
    }

    const fetchUserEvents = () => {
        fetch(`${url}/event/user/${userData.id}`)
            .then((response) => response.json())
            .then((data) => setUserEvents(data))
            .catch((error) => console.error('Error fetching:', error))
    }

    const handleDeleteEvent = async (id) => {
        try {
            await axios.delete(`${url}/event/${id}`)
            location.reload()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const fetchAttendance = async (id) => {
        setShowEventAttendance(!showEventAttendance)

        fetch(`${url}/attendance/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setEventAttendance(data)
                setIdEventAttendance(id)
            })
            .catch((error) => console.error('Error fetching:', error))
    }

    const renderAttendance = () => {
        return eventAttendance.map((event) => (
            <div key={event}>
                {showEventAttendance && (
                    <div key={event.userAttending}>
                        <p>⊛ {event.userAttending}</p>
                    </div>
                )}
            </div>
        ))
    }

    const handleModifyEvent = async () => {
        try {
            await axios.patch(`${url}/event/${eventModify.id}`, {
                location: eventLocation,
                lat: lat,
                long: long,
                duration: duration,
                description: description,
                image: image,
                date: date,
                time: time,
            })
            location.reload()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleChangeLocation = async () => {
        try {
            await axios
                .patch(`${url}/users/location`, {
                    id: userData.id,
                    lat: parseFloat(userPosition.latitude),
                    long: parseFloat(userPosition.longitude),
                })
                .then(function (response) {
                    updateUser(response.data)
                })
        } catch (error) {
            console.error('Error changing location:', error)
        }
    }

    const modifyEventForm = () => {
        return (
            <div>
                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">
                        Location:
                    </label>
                    <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">
                        Latitude:
                    </label>
                    <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">
                        Longitude:
                    </label>
                    <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={long}
                        onChange={(e) => setLong(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">
                        Duration:
                    </label>
                    <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">
                        Description:
                    </label>
                    <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">
                        Image:
                    </label>
                    <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">
                        Date:
                    </label>
                    <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-800 text-sm font-bold mb-2">
                        Time:
                    </label>
                    <input
                        type="text"
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>

                <button
                    className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={handleModifyEvent}
                >
                    Submit
                </button>
            </div>
        )
    }

    const renderEvents = () => {
        return userEvents.map((event) => (
            <div
                className="mx-[1rem] my-[1rem] border-2 border-black rounded h-fit p-[.5rem]"
                key={event.id}
            >
                <h3 className="text-white font-sans font-bold bg-blue-950 rounded overflow-hidden w-fit h-fit p-[.4rem] mb-[.5rem]">
                    {event.name}
                </h3>
                <button
                    type="button"
                    className="bg-red-700 hover:bg-red-950 text-white font-bold py-1 px-2 rounded mr-[1rem] mb-[.5rem]"
                    onClick={() => handleDeleteEvent(event.id)}
                >
                    Delete
                </button>

                <button
                    type="button"
                    className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-1 px-2 rounded mr-[1rem] mb-[.5rem]"
                    onClick={() => toggleForm(event)}
                >
                    Modify
                </button>

                <Link to={`/event/${event.id}`}>
                    <button
                        type="button"
                        className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-1 px-2 rounded mr-[1rem] mb-[.5rem]"
                    >
                        Check Page
                    </button>
                </Link>

                <button
                    type="button"
                    className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-1 px-2 rounded mr-[1rem] mb-[.5rem]"
                    onClick={() => fetchAttendance(event.id)}
                >
                    Check attendance
                </button>

                {showEventAttendance && event.id == idEventAttendance && (
                    <div>
                        <p className="font-bold">Attendees: </p>
                        <section>{renderAttendance()}</section>
                    </div>
                )}
                {form && event.id == eventModify.id && (
                    <section>{modifyEventForm()}</section>
                )}
            </div>
        ))
    }

    return (
        <div>
            <div className="rounded overflow-hidden shadow-lg bg-white h-fit pb-[3rem] mb-[2rem] xs:w-[20rem] md:w-[50rem]">
                <div className="m-[1rem] ">
                    <div className="flex justify-center mt-[1rem]">
                        <img
                            className="w-10 h-10 rounded-full"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        />
                        <p className="m-[.5rem] font-bebas text-xl">
                            {userData.username} Data:
                        </p>
                    </div>
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-bold mb-2">
                                Latitude:
                            </label>
                            <input
                                type="text"
                                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                value={userPosition.latitude}
                                onChange={(e) => {
                                    setUserPosition({
                                        latitude: e.target.value,
                                        longitude: userPosition.longitude,
                                    })
                                    setCustomLocation(true)
                                }}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-800 text-sm font-bold mb-2">
                                Longitude:
                            </label>
                            <input
                                type="text"
                                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                value={userPosition.longitude}
                                onChange={(e) => {
                                    setUserPosition({
                                        latitude: userPosition.latitude,
                                        longitude: e.target.value,
                                    })
                                    setCustomLocation(true)
                                }}
                                required
                            />
                        </div>
                        <button
                            className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-1 px-2 rounded mr-[1rem] mb-[.5rem]"
                            type="button"
                            onClick={handleChangeLocation}
                        >
                            Change location
                        </button>
                    </div>
                </div>
            </div>
            <div className="rounded overflow-hidden shadow-lg bg-white h-fit md:w-[50rem] pb-[3rem] xs:w-[20rem]">
                <div className="flex justify-center m-[1rem]">
                    <div className="justify-between mt-[1rem]">
                        <img
                            className="w-10 h-10 rounded-full mx-[1rem] xs:mt-[0.2rem]"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        />
                        <p className="hidden m-[.5rem] font-bebas text-xl  md:flex">
                            {userData.username} Events:
                        </p>
                    </div>
                    <div>
                        <CreateEventForm />
                        {userEvents && <section>{renderEvents()}</section>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPageContent
