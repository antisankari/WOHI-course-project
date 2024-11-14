import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: 'en',
    debug: true,
    resources: {
        en : {
            translation : {
                navtitle: "Quick weather",
                navweather: "Weather & Forecast",
                navmap: "Rain map",
                searchPlaceholder: "Enter city name here!",
                searchButton: "Search!",
                currentWeather: "Current weather in ",
                tempNow: "Temperature: ",
                cloudsNow: "Condition: ",
                windNow: "Windspeed: ",
                windNowFrom: " from ",
                windNowDegrees: " degrees.",
                forecast: "Forecast",
                threeDay: "3-Day forecast ",
                threeDayTemp: "Temp: ",
                threeDayCond: "Cond: ",
                threeDayWind: "Wind: "

            }
        },
        fi : {
            translation: {
                navtitle: "Pikasää",
                navweather: "Sää ja ennuste",
                navmap: "Sadealuekartta",
                searchPlaceholder: "Syötä kaupungin nimi!",
                searchButton: "Hae!",
                currentWeather: "Sää paikassa ",
                tempNow: "Lämpötila: ",
                cloudsNow: "Säätila: ",
                windNow: "Tuuli: ",
                windNowFrom: " suunnasta ",
                windNowDegrees: " astetta.",
                forecast: "Ennuste",
                threeDay: "3-päivän ennuste ",
                threeDayTemp: "Lämpötila: ",
                threeDayCond: "Sää: ",
                threeDayWind: "Tuuli: "
            }
        }
    }
});

export default i18n;