import { useState, useEffect } from 'react'
import './App.css'
import Weather from './Weather'
import Forecast from './Forecast'
import Searchfield from './Searchfield'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Navbar, Nav, NavbarBrand } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Mapview from './Mapview'
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);

  // geolocation
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((userPosition) => {
        const { latitude, longitude } = userPosition.coords;
        
        fetchForecastByLocation(latitude, longitude);
        fetchWeatherByLocation(latitude, longitude);
        notify("Got weather and forecast info from geolocation", "success")
      })
    } else {
      notify("Geolocation not available.", "warning");
    }
  }, [])

  // current weather api call by city name
  const fetchWeather = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;

    // lets not allow empty searches
    if (!city) {
      notify("Enter a city name!", "warning");
      return;
    }

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeather(data);
      console.log(data);

      if (response.ok) {
        notify("Weather info fetched!", 'success');
      } else {
        notify("City not found!", 'warning');
      }

    } catch (error) {
      notify("There was an error in the search", 'error');
    }

  }

  // current weather api call by latitude and longitude (geolocation)
  const fetchWeatherByLocation = async (latitude, longitude) => {
    const apiKey = import.meta.env.VITE_API_KEY;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeather(data);
      console.log(data);

    } catch (error) {
      notify("There was an error in the search", 'error');
    }

  }

  // forecast api call by city name
  const fetchForecast = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;

    // lets not allow empty searches
    if (!city) {
      notify("Enter a city name!", "warning");
      return;
    }

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setForecast(data);
      console.log(data);

    } catch (error) {
      console.log(error)
    }
  }

  // forecast api call by latitude and longitude (geolocation)
  const fetchForecastByLocation = async (latitude, longitude) => {
    const apiKey = import.meta.env.VITE_API_KEY;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setForecast(data);
      console.log(data);

      /*
      if (response.ok) {
        notify("Got weather and forecast info from geolocation", "success")
      }
        */

    } catch (error) {
      console.log(error)
    }

  }

  // toast notifications
  const notify = (message, type = 'default') => {
    switch (type) {
      case 'success':
        toast.success(message, { position: 'top-right' });
        break;
      case 'error':
        toast.error(message, { position: 'top-right' });
        break;
      case 'warning':
        toast.warning(message, { position: 'top-right' });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather();
      fetchForecast();
    }
  }, [city])

  useEffect(() => {
    document.body.style.backgroundColor = 'darkgray';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (

    <Router>
      
      <Navbar>
        <Container>
          <NavbarBrand>Otsikkoteksti</NavbarBrand>
          <Link to="/">Weather & Forecast</Link>
          <Link to="/weathermap">Mapview</Link>
        </Container>
      </Navbar>

      <Routes>
        <Route 
          path="/"
          element = {
            <div className="main-container">
            <div className="d-flex justify-content-center">The one and only weather app!</div>
            <Container fluid className="pt-5 mt-5">
              <Searchfield setCity={setCity} />
            </Container>
        
            <Container fluid="md" className="pt-5 mt-5">
              <Row className="justify-content-center">
                <Col sm={12} md={8} lg={6}>
                  <Weather weather={weather} />
                </Col>
                <Col sm={12} md={8} lg={6}>
                  <Forecast forecast={forecast} />
                </Col>
              </Row>
            </Container>
      
            <ToastContainer />
          </div>
          }
        />

        <Route 
          path="/weathermap"
          element = {
            <Mapview />
          }
        />

        <Route 
          path="*" 
          element={<Navigate 
          to="/" />} 
        />

      </Routes>
    </Router>

  )
  
}

export default App
