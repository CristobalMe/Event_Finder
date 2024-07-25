import Header from '../header/Header'
import NearbyEventsMap from '../NearbyEventsMap'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function RideshareEventForm({ user }) {
    const current_eventId = window.location.pathname.split('/')[3]
    const [event, setEvent] = useState()
    // Pass attendance here
    const [attendance, setAttendance] = useState()
    const [
        isAlreadyRegisteredForRidesharing,
        setIsAlreadyRegisteredForRidesharing,
    ] = useState(false)
    const [hasCar, setHasCar] = useState(false)
    const numberOfSeats = [1, 2, 3, 4, 5, 6]
    const [preferedArrivalTime, setPreferedArrivalTime] = useState()
    const [numberOfSeatsAvailable, setNumberOfSeatsAvailable] = useState(0)
    const [numberOfSeatsNeeded, setNumberOfSeatsNeeded] = useState(0)
    const url = import.meta.env.VITE_URL

    const mapContainerStyle = {
        width: '20rem',
        height: '15rem',
    }

    useEffect(() => {
        fetchEvent()
        fetchAttendance()
        fetchIsRegistered()
    }, [])

    const fetchEvent = () => {
        fetch(`${url}/event/${current_eventId}`)
            .then((response) => response.json())
            .then((data) => {
                setEvent(data)
            })
            .catch((error) => console.error('Error fetching:', error))
    }

    const fetchAttendance = () => {
        fetch(`${url}/attendance/user/${user.username}/${current_eventId}`)
            .then((response) => response.json())
            .then((data) => {
                setAttendance(data)
            })
            .catch((error) => console.error('Error fetching:', error))
    }

    const fetchIsRegistered = () => {
        fetch(
            `${url}/ridesharing/isRegistered/${user.username}/${current_eventId}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setIsAlreadyRegisteredForRidesharing(true)
                }
            })
            .catch((error) => console.error('Error fetching:', error))
    }

    const handlePostWithCar = async () => {
        try {
            await axios.post(`${url}/ridesharing/withCar`, {
                seatsAvailable: numberOfSeatsAvailable,
                arrivalTime: preferedArrivalTime,
                departingLat: user.lat,
                departingLong: user.long,
                user: user,
                event: event,
            })
            fetchIsRegistered()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handlePostWithoutCar = async () => {
        try {
            await axios.post(`${url}/ridesharing/withoutCar`, {
                numberOfSeatsNeeded: numberOfSeatsNeeded,
                preferedArrivalTime: preferedArrivalTime,
                user: user,
                event: event,
            })
            fetchIsRegistered()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        <div>
            {attendance && (
                <div>
                    <Header user={user} />
                    {!isAlreadyRegisteredForRidesharing && (
                        <div className="my-[10rem] flex items-center justify-center overflow-auto">
                            {event && (
                                <div className="rounded overflow-hidden shadow-lg bg-white lg:h-[35rem] lg:w-[50rem] xs:w-[22rem] xs:h-[35rem]">
                                    <p className="flex items-center justify-center font-bebas text-3xl mt-3 mx-3">
                                        {event.name} RideSharing Form:
                                    </p>
                                    <div className="lg:grid lg:grid-cols-2 mx-10">
                                        <div className="flex flex-col mx-5 mt-10 justify-center">
                                            <div className="mb-4">
                                                <label className="block text-gray-800 text-sm font-bold mb-2">
                                                    Do you have a car of your
                                                    own?
                                                </label>
                                                <Menu
                                                    as="div"
                                                    className="relative inline-block text-left mb-[1rem]"
                                                >
                                                    <div>
                                                        {hasCar && (
                                                            <MenuButton className="inline-flex w-fill justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                                {'Yes'}
                                                                <ChevronDownIcon
                                                                    aria-hidden="true"
                                                                    className="-mr-1 h-5 w-5 text-gray-400"
                                                                />
                                                            </MenuButton>
                                                        )}
                                                        {!hasCar && (
                                                            <MenuButton className="inline-flex w-fill justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                                {'No'}
                                                                <ChevronDownIcon
                                                                    aria-hidden="true"
                                                                    className="-mr-1 h-5 w-5 text-gray-400"
                                                                />
                                                            </MenuButton>
                                                        )}
                                                    </div>

                                                    <MenuItems
                                                        transition
                                                        className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                                    >
                                                        <div className="py-1">
                                                            <MenuItem
                                                                key={'Yes'}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full"
                                                                    onClick={() => {
                                                                        setHasCar(
                                                                            true
                                                                        )
                                                                    }}
                                                                >
                                                                    {'Yes'}
                                                                </button>
                                                            </MenuItem>

                                                            <MenuItem
                                                                key={'No'}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full"
                                                                    onClick={() => {
                                                                        setHasCar(
                                                                            false
                                                                        )
                                                                    }}
                                                                >
                                                                    {'No'}
                                                                </button>
                                                            </MenuItem>
                                                        </div>
                                                    </MenuItems>
                                                </Menu>
                                            </div>

                                            {hasCar && (
                                                <div className="mb-4">
                                                    <label className="block text-gray-800 text-sm font-bold mb-2">
                                                        Number of seats
                                                        available:
                                                    </label>
                                                    <Menu
                                                        as="div"
                                                        className="relative inline-block text-left mb-[1rem]"
                                                    >
                                                        <div>
                                                            <MenuButton className="inline-flex w-fill justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                                {
                                                                    numberOfSeatsAvailable
                                                                }
                                                                <ChevronDownIcon
                                                                    aria-hidden="true"
                                                                    className="-mr-1 h-5 w-5 text-gray-400"
                                                                />
                                                            </MenuButton>
                                                        </div>

                                                        <MenuItems
                                                            transition
                                                            className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                                        >
                                                            <div className="py-1">
                                                                {numberOfSeats.map(
                                                                    (c) => (
                                                                        <MenuItem
                                                                            key={
                                                                                c
                                                                            }
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full"
                                                                                onClick={() => {
                                                                                    setNumberOfSeatsAvailable(
                                                                                        parseInt(
                                                                                            c
                                                                                        )
                                                                                    )
                                                                                }}
                                                                            >
                                                                                {
                                                                                    c
                                                                                }
                                                                            </button>
                                                                        </MenuItem>
                                                                    )
                                                                )}
                                                            </div>
                                                        </MenuItems>
                                                    </Menu>
                                                </div>
                                            )}

                                            {!hasCar && (
                                                <div className="mb-4">
                                                    <label className="block text-gray-800 text-sm font-bold mb-2">
                                                        Number of seats needed:
                                                    </label>
                                                    <Menu
                                                        as="div"
                                                        className="relative inline-block text-left mb-[1rem]"
                                                    >
                                                        <div>
                                                            <MenuButton className="inline-flex w-fill justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                                {
                                                                    numberOfSeatsNeeded
                                                                }
                                                                <ChevronDownIcon
                                                                    aria-hidden="true"
                                                                    className="-mr-1 h-5 w-5 text-gray-400"
                                                                />
                                                            </MenuButton>
                                                        </div>

                                                        <MenuItems
                                                            transition
                                                            className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                                        >
                                                            <div className="py-1">
                                                                {numberOfSeats.map(
                                                                    (c) => (
                                                                        <MenuItem
                                                                            key={
                                                                                c
                                                                            }
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full"
                                                                                onClick={() => {
                                                                                    setNumberOfSeatsNeeded(
                                                                                        parseInt(
                                                                                            c
                                                                                        )
                                                                                    )
                                                                                }}
                                                                            >
                                                                                {
                                                                                    c
                                                                                }
                                                                            </button>
                                                                        </MenuItem>
                                                                    )
                                                                )}
                                                            </div>
                                                        </MenuItems>
                                                    </Menu>
                                                </div>
                                            )}

                                            <div className="mb-4">
                                                <label className="block text-gray-800 text-sm font-bold mb-2">
                                                    Preferred arrival time:
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

                                            {hasCar && (
                                                <div>
                                                    <Link
                                                        to={`/user/${user.id}`}
                                                    >
                                                        <button
                                                            className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                            type="button"
                                                            onClick={
                                                                handlePostWithCar
                                                            }
                                                        >
                                                            Submit
                                                        </button>
                                                    </Link>
                                                </div>
                                            )}

                                            {!hasCar && (
                                                <div>
                                                    <Link
                                                        to={`/event/${event.id}`}
                                                    >
                                                        <button
                                                            className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                            type="button"
                                                            onClick={
                                                                handlePostWithoutCar
                                                            }
                                                        >
                                                            Submit
                                                        </button>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>

                                        <div className="hidden lg:flex lg:flex-col justify-center items-center ">
                                            <p className="flex items-center justify-center font-bold text-xl mt-3 mx-3">
                                                Date:{' '}
                                                {String(event.date).slice(
                                                    0,
                                                    10
                                                )}
                                            </p>
                                            <p className="flex items-center justify-center font-bold text-xl mt-3 mx-3">
                                                Time: {event.time}
                                            </p>
                                            <div className="mr-5 mt-3">
                                                <NearbyEventsMap
                                                    user={event}
                                                    eventData={[event]}
                                                    mapContainerStyle={
                                                        mapContainerStyle
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {isAlreadyRegisteredForRidesharing && (
                <div>
                    <p className="flex text-white justify-center mt-[20rem]">
                        You have already registered for ridesharing in this
                        event. Please go to your user profile
                    </p>
                </div>
            )}
        </div>
    )
}

export default RideshareEventForm
