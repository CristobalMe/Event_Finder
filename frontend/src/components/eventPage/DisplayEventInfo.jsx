import { useState, useEffect } from 'react'
// Un comment for Demo
// import EventMap from "../EventMap";
import EventCreatorTooltip from '../eventCreatorTooltip/EventCreatorTooltip'
import axios from 'axios'

// TODO:
// GET LOCATION OF EVENT (LAT & LONG)
const DisplayEventInfo = ({ event, user }) => {
    const current_eventId = window.location.pathname.split('/')[2]
    const url = import.meta.env.VITE_URL
    let Logged = false
    let [userIsAttending, setUserIsAttending] = useState()

    if (user != null && user != undefined) Logged = true

    useEffect(() => {
        if (Logged) fetchUserAttendance()
    }, [userIsAttending])

    const handleRegister = async () => {
        if (userIsAttending == 0) {
            console.log(
                `${url}/attendance/user/${user.username}/${current_eventId}`
            )
            try {
                await axios.post(
                    `${url}/attendance/user/${user.username}/${current_eventId}`,
                    {
                        userAttending: user.username,
                        eventId: current_eventId,
                    }
                )
                fetchUserAttendance()
            } catch (error) {
                console.error('Error:', error)
            }
        } else {
            try {
                await axios.delete(
                    `${url}/attendance/user/${user.username}/${current_eventId}`,
                    {
                        userAttending: user.username,
                        eventId: current_eventId,
                    }
                )
                fetchUserAttendance()
            } catch (error) {
                console.error('Error:', error)
            }
        }
    }

    const fetchUserAttendance = () => {
        fetch(`${url}/attendance/user/${user.username}/${current_eventId}`)
            .then((response) => response.json())
            .then((data) => setUserIsAttending(data.length))
            .catch((error) => console.error('Error fetching:', error))
    }

    return (
        <div className="rounded overflow-hidden shadow-lg bg-white lg:h-[37rem] lg:w-[50rem] xs:w-[22rem]">
            {event && (
                <div className="flex">
                    <img
                        className="xs:h-[37rem] xs:w-[10rem] lg:h-[37rem] lg:w-[25rem]"
                        src={event.image}
                        id="image"
                        onError={(e) => {
                            e.target.src =
                                'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg'
                        }}
                    />
                    <div className="items-center justify-center m-[1rem] mb-[0rem]">
                        <div className="inline m-[1rem]">
                            <h2 className="font-bebas text-3xl">
                                {event.name}
                            </h2>
                            {Logged && (
                                <div>
                                    {userIsAttending == 0 && (
                                        <button
                                            className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded"
                                            onClick={handleRegister}
                                        >
                                            Register
                                        </button>
                                    )}

                                    {userIsAttending != 0 && (
                                        <EventCreatorTooltip>
                                            <button
                                                className="bg-red-700 hover:bg-red-950 text-white font-bold py-2 px-4 rounded"
                                                onClick={handleRegister}
                                            >
                                                Unregister
                                            </button>
                                        </EventCreatorTooltip>
                                    )}
                                </div>
                            )}
                        </div>
                        <p className="font-sans font-bold">
                            {event.description}
                        </p>

                        <div className="inline-flex mb-[1rem]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 xs:ml-[1rem] xs:mt-[1rem]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <p className="ml-[.5rem] xs:mt-[1rem]">
                                {event.duration}
                            </p>
                        </div>
                        <div className="inline-flex m-[1rem]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                />
                            </svg>
                            <p>{event.location}</p>
                        </div>
                        <div className="inline-flex m-[1rem]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                />
                            </svg>
                            <p>{event.category}</p>
                        </div>

                        <div className="inline-flex m-[1rem]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                            </svg>
                            <p>{event.rating}</p>
                        </div>

                        {/* Uncomment for demo */}
                        <div className="hidden lg:flex">
                            {/* <EventMap latitude={40.7826} longitude={73.9656} /> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DisplayEventInfo
