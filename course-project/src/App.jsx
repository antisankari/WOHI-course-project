import { useState, useEffect } from 'react'
import './App.css'
import Weather from './Weather'
import Forecast from './Forecast'
import Searchfield from './Searchfield'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState(null);

  // current weather api call
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

    // forecast api call
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
  
        if (response.ok) {
          notify("Weather info fetched!", 'success');
        } else {
          notify("City not found!", 'warning');
        }
  
      } catch (error) {
        notify("There was an error in the search", 'error');
      }
    }

  // notifications
  const notify = (message, type = 'default') => {
    switch (type) {
      case 'success':
        toast.success(message, { position: 'top-right' });
        break;
      case 'error':
        toast.error(message, { position: 'top-right' });
        break;
      case 'warning':
        toast.warning(message, { position: 'top-right'});
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
    <>
      <div className="center">The one and only weather app!</div>
      <Container fluid>
        <Searchfield setCity={setCity}/>
      </Container>

      <Container fluid className="pt-5 mt-5">
        <Row>
          <Col sm={6}>
            <Weather weather={weather}/>
          </Col>
          <Col sm={6}>
            <Forecast forecast={forecast}/>
          </Col>
        </Row>
      </Container>
      <ToastContainer/>
    </>
  )
}

export default App
