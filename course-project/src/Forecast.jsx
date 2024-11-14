import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { Button, Container, Row, Col } from 'react-bootstrap'
import {useTranslation} from 'react-i18next'

function Forecast({ forecast }) {

    const {t} = useTranslation();

    if (!forecast || !forecast.list) {
        return (
            <>
                <Card>
                    <Card.Header>{t('forecast')}</Card.Header>
                    <Card.Body>
                        <Card.Title>
                            Search for a city first
                        </Card.Title>
                        <Card.Text>
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
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    // this is AI generated, I had no idea how to get the times I wanted from the JSON
    const forecastData = (list) => {
        const times = ['06:00:00', '12:00:00', '18:00:00'];
        const dataByDay = {};

        list.forEach((entry) => {
            const [date, time] = entry.dt_txt.split(' ');

            if (times.includes(time)) {
                if (!dataByDay[date]) {
                    dataByDay[date] = [];
                }
                dataByDay[date].push(entry);
            }
        });

        return dataByDay;
    };

    const dataByDay = forecastData(forecast.list);

    // this is AI generated, I couldnt figure out how and what to do with JS to get the
    // parts of JSON that I needed
    const dailySummary = Object.keys(dataByDay)
        .slice(0, 3)
        .map((date) => {
            const dailyData = dataByDay[date];

            return {
                date: formatDate(date),
                forecasts: dailyData.map((item) => ({
                    time: item.dt_txt.split(' ')[1],
                    temp: item.main.temp,
                    condition: item.weather[0].description,
                    windSpeed: item.wind.speed,
                })),
            };
        });

    return (
        <Container>
            <Card>
            <Card.Header>{t('threeDay')}{forecast.city.name}, {forecast.city.country}</Card.Header>
            <Card.Body>
                <ListGroup variant="flush">
                {dailySummary.map((day, index) => (
                    <ListGroup.Item key={index}>
                    <Row>
                        <Col>
                        <p><strong>{day.date}</strong></p>
                        </Col>
                    </Row>
                    <Row>
                        {day.forecasts.map((item, j) => (
                        <Col key={j} sm={4}>
                            <div>
                            <p>{item.time}</p>
                            <p>{t('threeDayTemp')}{item.temp} °C</p>
                            <p>{t('threeDayCond')}{item.condition}</p>
                            <p>{t('threeDayWind')}{item.windSpeed} m/s</p>
                            </div>
                        </Col>
                        ))}
                    </Row>
                    </ListGroup.Item>
                ))}
                </ListGroup>
            </Card.Body>
            </Card>
        </Container>
        );

}

export default Forecast;