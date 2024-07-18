import { useState } from 'react'
import axios from 'axios'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

// To Do:
// Add error handling for when a user inputs a bad request (Create event & modify event)
const CreateEventForm = ({ user }) => {
    const url = import.meta.env.VITE_URL
    const [form, setForm] = useState(false)
    const [name, setEventName] = useState('')
    const [eventLocation, setEventLocation] = useState('')
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [duration, setDuration] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [category, setCategory] = useState('')
    const eventCategories = [
        'Art',
        'Comedy',
        'Dance',
        'Film',
        'Fitness',
        'Food',
        'Music',
        'Party',
        'Sports',
    ]

    const handleCreateEvent = async () => {
        try {
            await axios.post(`${url}/event`, {
                rating: 0,
                location: eventLocation,
                name: name,
                duration: duration,
                description: description,
                image: image,
                category: category,
                date: date,
                userId: user.id,
                lat: lat,
                long: long,
                time: time,
            })
            location.reload()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    return (
        // To Do:
        // Add specific categories, to allow filtering
        <div className="m-[1rem] mt-[1.5rem]">
            <button
                type="button"
                className="bg-blue-700 hover:bg-blue-950 text-white font-bold py-1 px-2 rounded mr-[1rem] mb-[.5rem] xs:ml-[1rem] md:ml-[0rem]"
                onClick={() => setForm(!form)}
            >
                Create event
            </button>

            {form && (
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-800 text-sm font-bold mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                            value={name}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-800 text-sm font-bold mb-2">
                            Category:
                        </label>
                        <Menu
                            as="div"
                            className="relative inline-block text-left"
                        >
                            <div>
                                <MenuButton className="inline-flex w-fill justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    {category}
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
                                    {eventCategories.map((c) => (
                                        <MenuItem key={c}>
                                            <button
                                                type="button"
                                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full"
                                                onClick={() => setCategory(c)}
                                            >
                                                {c}
                                            </button>
                                        </MenuItem>
                                    ))}
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>

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
                        onClick={handleCreateEvent}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    )
}

export default CreateEventForm
