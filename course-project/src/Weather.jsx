import React from 'react'
import { Card } from 'react-bootstrap'
import {useTranslation} from 'react-i18next'


function Weather({weather}) {
    const {t} = useTranslation();

    if (!weather || !weather.weather) {
        return (
            <Card>
            <Card.Header>{t('currentWeather')}</Card.Header>
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
                <Card.Header>{t('currentWeather')}{weather.name}, {weather.sys.country}</Card.Header>
                <Card.Body>
                    <Card.Text>{t('tempNow')}{weather.main.temp} °C</Card.Text>
                    <Card.Text>{t('cloudsNow')}{desc}</Card.Text>
                    <Card.Text>{t('windNow')}{weather.wind.speed} m/s {t('windNowFrom')} {weather.wind.deg} {t('windNowDegrees')}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Weather;