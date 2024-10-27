import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { Button, Container, Row, Col } from 'react-bootstrap'

function Forecast({ forecast }) {

    if (!forecast || !forecast.list) {
        return (
            <>
                <Card>
                    <Card.Header>Forecast</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            No data
                        </Card.Title>
                        <Card.Text>

                            x



                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    }

    const items = forecast.list.slice(0, 4);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-indexed
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    return (
        <Card>
            <Card.Header>4-Day Forecast</Card.Header>
            <Card.Body>
                <Card.Title>{forecast.city.name}, {forecast.city.country}</Card.Title>
                <Card.Text>
                    <ListGroup variant="flush">
                        {items.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <p>{formatDate(item.dt_txt)}</p>
                                <p>Temperature: {item.main.temp}°C</p>
                                <p>Condition: {item.weather[0].description}</p>
                                <p>Wind Speed: {item.wind.speed} m/s</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Text>
            </Card.Body>
        </Card>
    )

}

export default Forecast;