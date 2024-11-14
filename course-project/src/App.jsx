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
import i18n from './i18n'
import { useTranslation } from 'react-i18next';


function App() {
  const {t} = useTranslation();
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  };

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
      
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <NavbarBrand>{t('navtitle')}</NavbarBrand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">{t('navweather')}</Nav.Link>
              <Nav.Link as={Link} to="/weathermap">{t('navmap')}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <div id="output"></div>
        <Button className="me-2" onClick={() => changeLanguage('en')}>Eng</Button>
        <Button className="me-2" onClick={() => changeLanguage('fi')}>Fi</Button>
      </Navbar>

      <Routes>
        <Route 
          path="/"
          element = {
            <div className="main-container">
            <Container fluid className="mt-5">
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
