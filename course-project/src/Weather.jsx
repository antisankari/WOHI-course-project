import React from 'react'
import { Card } from 'react-bootstrap'

function Weather({weather}) {

    if (!weather || !weather.weather) {
        return (
            <Card>
            <Card.Header>Current weather</Card.Header>
            <Card.Body>
                <Card.Title>
                Search for a city first
                </Card.Title>
                <Card.Text>
                </Card.Text>
            </Card.Body>
        </Card>
        )
    }

    const desc = weather.weather[0].description;

    return (
        <>
            <Card>
                <Card.Header>Current weather in {weather.name}, {weather.sys.country}</Card.Header>
                <Card.Body>

                    <Card.Text>Temperature: {weather.main.temp} °C</Card.Text>
                    <Card.Text>Cloud cover: {desc}</Card.Text>
                    <Card.Text>Windspeed: {weather.wind.speed} m/s from {weather.wind.deg} degrees</Card.Text>

                </Card.Body>
            </Card>
        </>
    )
}

export default Weather;