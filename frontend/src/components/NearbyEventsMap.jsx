import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api'

function NearbyEventsMap({ user, eventData, mapContainerStyle }) {
    let eventsLocation = []
    eventData.map((e) => {
        let lat = parseFloat(e.lat)
        let long = parseFloat(e.long)
        let position = { lat: lat, lng: long }
        eventsLocation.push(position)
    })

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    })

    const center = {
        lat: parseFloat(user.lat),
        lng: parseFloat(user.long),
    }

    return isLoaded ? (
        <div className="rounded overflow-hidden shadow-lg bg-white">
            <div className="flex items-center justify-center">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
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
