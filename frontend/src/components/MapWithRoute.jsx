import { useState } from 'react'
import {
    useJsApiLoader,
    GoogleMap,
    DirectionsRenderer,
} from '@react-google-maps/api'
import { useEffect } from 'react'

function MapWithRoute({ origin, destination }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    })

    const center = origin

    useEffect(() => {
        if (isLoaded) {
            calculateRoute()
        }
    }, [isLoaded])

    const [directionsResponse, setDirectionsResponse] = useState(null)

    async function calculateRoute() {
        const directionsService = new window.google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
    }

    return isLoaded ? (
        <>
            <GoogleMap
                center={center}
                zoom={13}
                mapContainerStyle={{ width: '100%', height: '100vh' }}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >
                {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}
            </GoogleMap>
        </>
    ) : (
        <></>
    )
}

export default MapWithRoute
