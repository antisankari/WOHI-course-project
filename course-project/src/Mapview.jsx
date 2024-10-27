import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function Mapview() {

    const apiKey = import.meta.env.VITE_API_KEY;

    const mapBoundary = [
        [59.5, 19.0],
        [70.5, 31.0]
    ]

    return (
        <MapContainer
            center={[65, 25]}
            zoom={5}
            minZoom={5}
            maxZoom={5}
            maxBounds = {mapBoundary}
            dragging = {false}
            zoomControl = {false}
            style={{ height: '700px', width: '500px' }}
        >
            <TileLayer
                url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <TileLayer
                url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}
                attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            />
        </MapContainer>
    );

}

export default Mapview;