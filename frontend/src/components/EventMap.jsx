import React from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api'

function NearbyEventsMap({ latitude, longitude }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    })

    const center = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
    }

    return isLoaded ? (
        <div className="rounded overflow-hidden shadow-lg bg-white">
            <div className="flex items-center justify-center">
                <GoogleMap
                    mapContainerStyle={{ width: '24rem', height: '15rem' }}
                    center={center}
                    zoom={12}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                    }}
                >
                    <MarkerF position={center}></MarkerF>
                </GoogleMap>
            </div>
        </div>
    ) : (
        <></>
    )
}

export default React.memo(NearbyEventsMap)
