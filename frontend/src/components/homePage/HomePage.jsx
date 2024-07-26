import EventsCarousel from '../carousel/EventsCarousel'
import Header from '../header/Header'
import SpinningBanner from '../spinningBanner/SpinningBaner'
import LoadingPage from '../loadingPage/LoadingPage'
import RotatingEventImages from '../rotatingEventImages/RotatingEventImages'
import { useState, useEffect } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function HomePage({ user }) {
    // const MapsApiKey = import.meta.env.VITE_MAPS_API_KEY
    const url = import.meta.env.VITE_URL
    let [events, setEvents] = useState()
    const [filteredEvents, setFilteredEvents] = useState()
    const [currentCategory, setCurrentCategory] = useState('Art')
    const [isLoading, setIsLoading] = useState(true)
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

    useEffect(() => {
        if (isLoading) {
            fetchEvents()
            fetchEventsWithCategory(currentCategory)
        }
        setIsLoading(false)
    }, [events, currentCategory])

    const fetchEvents = () => {
        fetch(`${url}/event`)
            .then((response) => response.json())
            .then((data) => {
                setEvents(data)
            })
            .catch((error) => console.error('Error fetching:', error))
    }

    const fetchEventsWithCategory = (category) => {
        fetch(`${url}/event/category/${category}`)
            .then((response) => response.json())
            .then((data) => {
                setFilteredEvents(data)
            })
            .catch((error) => console.error('Error fetching:', error))
    }

    return (
        <div>
            {!isLoading && (
                <div>
                    <Header user={user} />

                    <div className="mt-[10rem]">
                        <SpinningBanner />
                    </div>

                    <div className="mx-[5rem]  mt-[10rem] content-center sm:mx-[7rem]">
                        <h2 className="font-bebas text-white text-xl">
                            For You
                        </h2>
                        <EventsCarousel events={events} />
                    </div>

                    <div className="mx-[5rem]  mt-[10rem] content-center sm:mx-[7rem]">
                        <div>
                            <h2 className="font-bebas text-white text-xl">
                                Filter By Category
                            </h2>
                            <Menu
                                as="div"
                                className="relative inline-block text-left mb-[1rem]"
                            >
                                <div>
                                    <MenuButton className="inline-flex w-fill justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        {currentCategory}
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
                                                    onClick={() => {
                                                        setCurrentCategory(c)
                                                        setIsLoading(true)
                                                        fetchEventsWithCategory(
                                                            currentCategory
                                                        )
                                                    }}
                                                >
                                                    {c}
                                                </button>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                        <EventsCarousel events={filteredEvents} />
                    </div>

                    <div className="mx-[5rem]  mt-[10rem] content-center sm:mx-[7rem]">
                        <h2 className="font-bebas text-white text-xl">
                            This week
                        </h2>
                        <EventsCarousel events={events} />
                    </div>

                    <h2 className="hidden xl:flex justify-center font-bebas text-white text-3xl mt-[10rem]">
                        Top 5 events
                    </h2>
                    <div className="hidden xl:flex mb-[20rem] mt-[8rem] mx-[22rem]">
                        <div className="">
                            <RotatingEventImages events={events} />
                        </div>
                    </div>
                </div>
            )}

            {isLoading && (
                <div>
                    <LoadingPage />
                </div>
            )}
        </div>
    )
}

export default HomePage
