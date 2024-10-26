import React from 'react'
import { Card } from 'react-bootstrap'

function Weather({weather}) {

    const desc = weather.weather[0].description;

    return (
        <>
            <Card>
                <Card.Header>Current weather</Card.Header>
                <Card.Body>
                    <Card.Title>
                        {weather.name}, {weather.sys.country}
                    </Card.Title>
                    <Card.Text>
                        
                        <p>Temperature: {weather.main.temp} C</p>
                        <p>Cloud cover: {desc}</p>
                        <p>Windspeed: <p>{weather.wind.speed} m/s from {weather.wind.deg} degrees</p></p>
                        
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Weather;