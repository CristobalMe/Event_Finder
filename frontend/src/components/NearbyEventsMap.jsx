import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api'

function NearbyEventsMap({ user, eventData }) {
    let eventsLocation = []
    eventData.map((e) => {
        let lat = e.lat
        let long = e.long
        let position = { lat: lat, lng: long }
        eventsLocation.push(position)
    })

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    })

    const center = {
        lat: user.lat,
        lng: user.long,
    }

    const containerStyle = {
        width: '40rem',
        height: '25rem',
    }

    return isLoaded ? (
        <div className="rounded overflow-hidden shadow-lg bg-white pb-[3rem] mb-[2rem] xs:w-[20rem] md:w-[50rem] h-[25rem]">
            <div className="flex items-center justify-center">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                    }}
                >
                    {eventsLocation.map((point, i) => (
                        <MarkerF position={point} key={i}></MarkerF>
                    ))}
                    <></>
                </GoogleMap>
            </div>
        </div>
    ) : (
        <></>
    )
}

export default React.memo(NearbyEventsMap)
